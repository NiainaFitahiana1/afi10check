'use client';

import React, { useState, useEffect } from 'react';

interface Ticket {
  token: string;
  numero: string;
  statut: string;
  event: string;
  date: string;
  heure: string;
  lieu: string;
  categorie: string;
  prix: number | string;
  organisateur: string;
  notes: string;
}

export default function TicketVerification() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyTicket = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('t');

      if (!token) {
        setError('TOKEN MANQUANT');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Impossible de charger les données');

        const data = await response.json();
        const foundTicket = data.tickets.find((item: Ticket) => item.token === token);

        if (!foundTicket) {
          setError('TICKET INVALIDE');
        } else {
          setTicket(foundTicket);
        }
      } catch (err) {
        console.error(err);
        setError('ERREUR DE CHARGEMENT');
      } finally {
        setLoading(false);
      }
    };

    verifyTicket();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du ticket en cours...</p>
        </div>
      </div>
    );
  }

  const isValid = !error && ticket;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Vérification Ticket
          </h1>
          <p className="text-gray-600 text-lg">Scan QR • Vérification automatique</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {error ? (
            // === Ticket Invalide ===
            <div className="p-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-2xl mb-6">
                ✕
              </div>
              <div className="text-2xl font-bold text-red-600 mb-3">
                {error}
              </div>
              <p className="text-gray-600 text-lg">
                {error === 'TOKEN MANQUANT'
                  ? "Aucun identifiant de ticket n'a été fourni."
                  : "Ce ticket n'existe pas ou a été désactivé."}
              </p>
            </div>
          ) : ticket ? (
            // === Ticket Valide ===
            <div className="p-8 md:p-10">
              <div className="flex justify-center mb-8">
                <div className="bg-teal-600 text-white font-bold text-lg px-8 py-3 rounded-2xl shadow-lg">
                  {ticket.statut.toUpperCase()}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-teal-600 font-semibold text-sm tracking-widest mb-1">NUMÉRO DE TICKET</p>
                  <p className="text-3xl font-bold text-gray-900">{ticket.numero}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoRow label="Événement" value={ticket.event} />
                  <InfoRow label="Date" value={ticket.date} />
                  <InfoRow label="Heure" value={ticket.heure} />
                  <InfoRow label="Lieu" value={ticket.lieu} />
                  <InfoRow label="Catégorie" value={ticket.categorie} />
                  <InfoRow label="Prix" value={`${ticket.prix} Ar`} />
                </div>

                <div>
                  <p className="text-teal-600 font-semibold text-sm tracking-widest mb-1">ORGANISATEUR</p>
                  <p className="text-gray-800 text-lg">{ticket.organisateur}</p>
                </div>

                {ticket.notes && (
                  <div>
                    <p className="text-teal-600 font-semibold text-sm tracking-widest mb-1">NOTES</p>
                    <p className="text-gray-700">{ticket.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Powered by Your Event System
        </p>
      </div>
    </div>
  );
}

// Composant auxiliaire
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-gray-900 font-semibold text-lg mt-1">{value}</p>
    </div>
  );
}
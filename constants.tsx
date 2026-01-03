
import React from 'react';
import { Station } from './types';

export const STATIONS: Station[] = [
  {
    id: 'antena1',
    name: 'Antena 1',
    genre: 'Pop / Soft',
    url: 'https://stream.antena1.com.br/stream',
    logo: 'https://picsum.photos/seed/antena1/200/200',
    location: 'São Paulo, SP',
    description: 'A melhor programação internacional, música leve e informação de qualidade.'
  },
  {
    id: 'jovempan',
    name: 'Jovem Pan FM',
    genre: 'Pop / Rock',
    url: 'https://servidor39.brlogic.com:8300/live',
    logo: 'https://picsum.photos/seed/jpan/200/200',
    location: 'São Paulo, SP',
    description: 'Número 1 em audiência jovem, com hits, entretenimento e talk shows.'
  },
  {
    id: 'novabrasil',
    name: 'NovaBrasil FM',
    genre: 'MPB',
    url: 'https://novabrasil.atp.radio/radio/8010/stream',
    logo: 'https://picsum.photos/seed/novabrasil/200/200',
    location: 'Brasil',
    description: 'A rádio que vibra a música brasileira de todas as épocas.'
  },
  {
    id: 'radiousp',
    name: 'Rádio USP',
    genre: 'Cultural / MPB',
    url: 'https://stream.radio.usp.br:8000/usp64.mp3',
    logo: 'https://picsum.photos/seed/usp/200/200',
    location: 'São Paulo, SP',
    description: 'Conteúdo acadêmico, cultural e a melhor seleção de música brasileira.'
  },
  {
    id: 'alphafm',
    name: 'Alpha FM',
    genre: 'Soft / Adult Contemporary',
    url: 'https://alpha.atp.radio/radio/8020/stream',
    logo: 'https://picsum.photos/seed/alpha/200/200',
    location: 'São Paulo, SP',
    description: 'Estilo e elegância musical para o seu dia a dia.'
  },
  {
    id: 'gaucha',
    name: 'Rádio Gaúcha',
    genre: 'Notícias / Esportes',
    url: 'https://shout.clicrbs.com.br/gaucha_poa.mp3',
    logo: 'https://picsum.photos/seed/gaucha/200/200',
    location: 'Porto Alegre, RS',
    description: 'Líder absoluta em notícias e a paixão pelo futebol gaúcho.'
  },
  {
    id: 'cbn',
    name: 'CBN São Paulo',
    genre: 'Notícias',
    url: 'https://26463.live.streamtheworld.com/CBN_SP_64_AAC_SC',
    logo: 'https://picsum.photos/seed/cbn/200/200',
    location: 'Brasil',
    description: 'A rádio que toca notícia 24 horas por dia.'
  }
];

export const ICONS = {
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Pause: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  VolumeUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l2.4 4.8 5.6.8-4 4 1 5.4-5-2.6-5 2.6 1-5.4-4-4 5.6-.8L12 2z" />
    </svg>
  )
};

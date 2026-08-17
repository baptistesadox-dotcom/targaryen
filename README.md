# Lignée Targaryen

Arbre généalogique interactif de la maison Targaryen tel qu'il est raconté dans **Feu & Sang**,
de la Conquête d'Aegon (1 ap. C.) à l'avènement d'Aegon III (131 ap. C.).

PWA hors ligne, sans serveur ni compte : tout tient dans `index.html`.

## Ce qu'elle fait

- **Arbre** zoomable (pince / glisse). Toucher un nom l'éclaire avec toute sa lignée, ancêtres et descendants.
- Filtres : les rois, les cavaliers de dragon, les camps de la Danse des Dragons (Noirs / Verts).
- **Fiches** : dates, dragon, camp, parents, conjoints, enfants, frères et demi-frères — tout est cliquable.
- **Personnes** : recherche et liste par maison.
- **Chronologie** : les huit règnes et les grands événements.
- **Mode lecture** : on indique où on en est dans le livre, l'app masque ce qui n'est pas encore arrivé
  (personnages pas encore nés, morts et fins de vie à venir).
- Thème parchemin ou nuit, taille du texte réglable.

## Mise à jour

Le service worker va chercher la dernière version à chaque ouverture (network-first) et recharge
la page automatiquement quand une nouvelle version prend la main. Pour publier une mise à jour :
incrémenter `VERSION_APP` dans `index.html`, `git commit`, `git push`.

## Développement

    powershell -NoProfile -ExecutionPolicy Bypass -File dev-server.ps1

puis http://localhost:8322/

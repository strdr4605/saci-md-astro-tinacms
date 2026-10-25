---
name: saci-catalog-search
description: Găsește sacul potrivit pe saci.md (polipropilenă, polietilenă, plasă, big bags, stretch) după dimensiuni, capacitate sau domeniu de utilizare. Folosește la întrebări de tip "ce saci aveți pentru zahăr / făină / cereale / gunoi / construcții". Use when someone needs a bag size or material for a use case.
---

# Căutare produse pe saci.md

## 1. Alege sursa de date

| Sursă | Când o folosești |
|---|---|
| `https://saci.md/product-index.json` | Caută produse cu filtre (categoria, text, specificații) |
| `https://saci.md/index.md` | Catalogul complet în Markdown, cu linkuri pe fiecare produs |
| `https://saci.md/<slug>.md` | Pagina unui produs în Markdown (descriere + specificații) |
| `https://saci.md/llms.txt` | Descrierea companiei și categoriilor |
| `https://saci.md/.well-known/ai-catalog.json` | Manifestul de descoperire cu toate produsele |

## 2. Filtrează după nevoia clientului

- **Cereale, făină, zahăr, semințe** → Polipropilenă (saci albi, țesuți, reutilizabili).
- **Deșeuri menajere, nisip, pietriș, moloz** → Polietilenă.
- **Fructe și legume** → Plasă (rașchel).
- **Cereale, făină, zahăr în vrac** → Big bags (FIBC).
- **Paletizare și împachetare** → Stretch film și plasă tubulară.

## 3. Stările produsului

- Capacitate: 15–40 kg (polietilenă), 20–60 kg (polipropilenă).
- Dimensiuni uzuale: 32x62, 35x65, 38x68, 43x70, 50x80, 50x92 (PE); 35x65, 50x80, 50x90, 50x100, 55x100, 55x105, 60x110 (PP); 30x34, 40x58, 52x72 (plasă).
- Câmpul `outOfStock` marchează produsul ca fiind temporar indisponibil.

## 4. Instrumente WebMCP

Dacă browserul suportă WebMCP, folosește instrumentele `list_categories`, `search_products`, `get_product` și `get_contact`. Fără WebMCP, folosește `product-index.json` cu `curl` sau `fetch`.

## 5. Răspunde

Precizează: tipul sacului, dimensiunile, capacitatea, cantitatea, stocul și linkul paginii produsului. Nu inventa prețuri: site-ul nu afișează prețuri.

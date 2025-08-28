# Fonction	Détails
| Descriptions                     | Explications                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Cache                            | Les requêtes sont mémorisées (par queryKey). Revenir sur la page → données instantanées. |
| Stale-while-revalidate           | Affiche d’abord la version cache, puis raffraîchit en arrière-plan sans flicker.         |
| Retry auto & exponential backoff | En cas d’erreur réseau, tente de nouveau.                                                |
| Refetch on window focus          | Quand l’onglet revient au premier plan.                                                  |
| Pagination                       | infinite scroll	Via useInfiniteQuery.                                                    |
| Mutations                        | useMutation pour POST/PUT/DELETE avec optimistic update rollback.                        |
| DevTools                         | Visualise cache, états, perf.                                                            |
| SSR / React 18                   | streaming ready	Hydrate les données côté serveur.                                        |
| Typage TS                        | Les generics font remonter le type de réponse jusqu’à ton UI.                            |
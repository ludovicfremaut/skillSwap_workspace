import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserSearch } from '@/hooks/useUserSearch';
import type { IUser } from '@/types/user';
import '@testing-library/jest-dom'; // Test spécifique pour les assertions DOM


//On crée des faux utilisateurs pour les tests
const testUsers: IUser[] = [
  {
    id: 1,
    firstname: 'Alice',
    lastname: 'Smith',
    email: 'alice@example.com',
    profile_picture: '/images/alice.jpg',
    zipcode: '75001',
    availability: 'available',
    description: 'Passionate about cooking and painting.',
    city: 'Paris',
    sender_id: 0, 
    receiver_id: 0, 
    skills: [{ id: 1, name: 'cuisine' }, { id: 2, name: 'peinture' }],
  },
  {
    id: 2,
    firstname: 'Bob',
    lastname: 'Johnson',
    email: 'bob@example.com',
    profile_picture: '/images/bob.jpg',
    zipcode: '75002',
    availability: 'busy',
    description: 'Gardening enthusiast.',
    city: 'Lyon',
    sender_id: 0,
    receiver_id: 0,
    skills: [{ id: 3, name: 'jardinage' }],
  },
  {
    id: 3,
    firstname: 'Charlie',
    lastname: 'Brown',
    email: 'charlie@example.com',
    profile_picture: '/images/charlie.jpg',
    zipcode: '75001',
    availability: 'available',
    description: 'Loves cooking.',
    city: 'Paris',
    sender_id: 0,
    receiver_id: 0,
    skills: [{ id: 1, name: 'cuisine' }],
  },
];

describe('useUserSearch hook', () => {
  // On vérifie que tous les utilisateurs sont retournés au début :
  it('should return initial users on init', () => {
    // On exécute le hook avec la liste d'utilisateurs de test :
    const { result } = renderHook(() => useUserSearch(testUsers));
    // On vérifie que la liste filtrée au départ est bien égale à la liste complète
    expect(result.current.filteredUsers).toEqual(testUsers);
  });

  // On teste le filtre par compétence
  it('should filter users by skill', () => {
    // On exécute le hook avec la liste d'utilisateurs de test :
    const { result } = renderHook(() => useUserSearch(testUsers));
    // On simule un appel à la fonction handleSearch pour filtrer par "cuisine"
    act(() => {
      result.current.handleSearch({ skill: 'cuisine', zipcode: '' });
    });
    // On vérifie que seuls les utilisateurs avec la compétence "cuisine" sont retournés
    expect(result.current.filteredUsers).toEqual([
      testUsers[0], // Alice (cuisine)
      testUsers[2], // Charlie (cuisine)
    ]);
  });

  // Pareil mais avec le code postal
  it('should filter users by zipcode', () => {
    const { result } = renderHook(() => useUserSearch(testUsers));

    act(() => {
      result.current.handleSearch({ skill: '', zipcode: '75002' });
    });

    expect(result.current.filteredUsers).toEqual([
      testUsers[1], // Bob (75002)
    ]);
  });

  // Pareil avec compétences ET code postal
  it('should filter users by skill and zipcode', () => {
    const { result } = renderHook(() => useUserSearch(testUsers));

    act(() => {
      result.current.handleSearch({ skill: 'cuisine', zipcode: '75001' });
    });

    expect(result.current.filteredUsers).toEqual([
      testUsers[0], // Alice
      testUsers[2], // Charlie
    ]);
  });

  // On vérifie que tous les utilisateurs sont retournés sans filtre
  it('should return all users if no filter is provided', () => {
    const { result } = renderHook(() => useUserSearch(testUsers));

    act(() => {
      result.current.handleSearch({ skill: '', zipcode: '' });
    });

    expect(result.current.filteredUsers).toEqual(testUsers);
  });
});
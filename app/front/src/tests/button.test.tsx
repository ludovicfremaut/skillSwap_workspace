import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; // Test ce que voit et fait l'utilisateur
import { Button } from '@/components/ui/Button';
import '@testing-library/jest-dom'; // Test spécifique pour les assertions DOM (DOM virtuel)

// On test le composant Button :
describe('Button component', () => {
  // On vérifie le rendu du bouton
  it('renders with default props and displays text', () => {
    // Simulation du visuel de l'utilisateur :
    render(<Button>Click me</Button>);
    // On récupère le bouton affiché à l'écran :
    const button = screen.getByRole('button', { name: /click me/i });
    // On vérfie que le bouton existe bien dans le DOM :
    expect(button).toBeInTheDocument();
  });

  // On vérifie les props du bouton :
  it('applies the correct variant and size classes', () => {
    // On rend le bouton avec des props spécifiques dans le DOM virtuel :
    render(<Button variant="destructive" size="lg">Danger</Button>);
    // On récupère le bouton par le texte danger avec une regex pour le rendre insensible à la casse :
    const button = screen.getByRole('button', { name: /danger/i });
    // On vérifie que les classes CSS sont bien appliquées :
    expect(button.className).toMatch(/bg-destructive/);
    expect(button.className).toMatch(/h-10/);
  });

  // On test le fonctionnement du clic :
  it('calls onClick handler when clicked', () => {
    // On crée une fonction fictive avec vi.fn :
    const handleClick = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    // On rend le composant Button avec la fonction fictive :
    render(<Button onClick={handleClick}>Click</Button>);
    // On récupère le bouton dans le DOM fictif :
    const button = screen.getByRole('button', { name: /click/i });
    // On simule un clic sur le bouton :
    fireEvent.click(button);
    // On vérifie que la fonction a bien été appelée
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

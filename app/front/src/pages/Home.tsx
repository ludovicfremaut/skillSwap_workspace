import Homepage from '../components/Homepage';
import Header from '../components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header />

        {/* MainContent */}
        <Homepage />
        {/* Footer */}
        <Footer />
    </div>
  );
}

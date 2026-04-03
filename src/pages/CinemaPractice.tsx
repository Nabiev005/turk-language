import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CINEMA_PLAYLIST } from '../data/data';

const CinemaContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
  @media (max-width: 1100px) { grid-template-columns: 1fr; }
`;

const PlayerWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  position: relative;
  border: 4px solid #1e293b;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MovieDetails = styled.div`
  background: white;
  padding: 30px;
  border-radius: 24px;
  margin-top: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  h2 { font-size: 1.8rem; color: #1e293b; margin: 15px 0; }
  p { color: #64748b; line-height: 1.6; }
`;

const Sidebar = styled.aside`
  background: #f8fafc;
  padding: 20px;
  border-radius: 24px;
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const MovieItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 15px;
  border: 2px solid ${p => p.$active ? '#10b981' : 'transparent'};
  background: ${p => p.$active ? '#fff' : 'transparent'};
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background: #fff; border-color: #e2e8f0; }
  h4 { margin-bottom: 4px; color: #1e293b; font-weight: 700; }
  span { font-size: 0.8rem; color: #94a3b8; }
`;

const CinemaPractice = () => {
  const [selectedMovie, setSelectedMovie] = useState(CINEMA_PLAYLIST[0]);
  const topRef = useRef<HTMLDivElement>(null);

  const handleSelect = (movie: typeof selectedMovie) => {
    setSelectedMovie(movie);
    if (window.innerWidth < 1100) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CinemaContainer ref={topRef}>
      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMovie.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <PlayerWrapper>
              {/* iframe - эң ишенимдүү жол */}
              <iframe
                src={`https://www.youtube.com/embed/${selectedMovie.id}?rel=0&modestbranding=1&origin=${window.location.origin}`}
                title={selectedMovie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </PlayerWrapper>

            <MovieDetails>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {selectedMovie.category}
                </span>
                <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {selectedMovie.level}
                </span>
              </div>
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.description}</p>
            </MovieDetails>
          </motion.div>
        </AnimatePresence>
      </div>

      <Sidebar>
        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎬</span> Видео сабактар
        </h3>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '5px' }}>
          {CINEMA_PLAYLIST.map((movie) => (
            <MovieItem
              key={movie.id}
              $active={selectedMovie.id === movie.id}
              onClick={() => handleSelect(movie)}
            >
              <h4>{movie.title}</h4>
              <span>{movie.category} • {movie.level}</span>
            </MovieItem>
          ))}
        </div>
      </Sidebar>
    </CinemaContainer>
  );
};

export default CinemaPractice;
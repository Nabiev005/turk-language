import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CINEMA_PLAYLIST } from '../data/data';

type Movie = (typeof CINEMA_PLAYLIST)[number];

const readStringArray = (key: string) => {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const readNotes = () => {
  try {
    const saved = localStorage.getItem('cinema_notes');
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed && typeof parsed === 'object' ? parsed as Record<string, string> : {};
  } catch {
    return {};
  }
};

const CinemaContainer = styled.div`
  width: min(1300px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 22px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 760px) {
    width: min(100% - 24px, 1300px);
    padding-top: 18px;
  }
`;

const PlayerWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.22);
  position: relative;
  border: 1px solid #1e293b;

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
  padding: clamp(18px, 4vw, 30px);
  border-radius: 8px;
  margin-top: 18px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(148, 163, 184, 0.18);
  h2 { font-size: clamp(1.35rem, 4vw, 1.8rem); color: #1e293b; margin: 15px 0; letter-spacing: 0; }
  p { color: #64748b; line-height: 1.6; }
`;

const Hero = styled.div`
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: clamp(18px, 4vw, 28px);
  margin-bottom: 18px;

  h1 {
    color: var(--text);
    font-size: clamp(1.7rem, 5vw, 2.4rem);
    letter-spacing: 0;
    margin-bottom: 8px;
  }

  p {
    color: var(--muted);
    max-width: 720px;
  }
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  min-width: 0;
  padding: 13px 14px;
  border: 1px solid #dbe4ee;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;

  &:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
  }
`;

const Select = styled.select`
  padding: 13px 14px;
  border: 1px solid #dbe4ee;
  border-radius: 8px;
  background: white;
  color: #334155;
  font-weight: 700;
  outline: none;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ $active?: boolean }>`
  border-radius: 8px;
  padding: 10px 14px;
  background: ${props => props.$active ? 'var(--brand)' : '#f8fafc'};
  color: ${props => props.$active ? 'white' : '#334155'};
  border: 1px solid ${props => props.$active ? 'var(--brand)' : '#dbe4ee'};
  font-weight: 800;

  &:hover {
    border-color: var(--brand);
  }
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Badge = styled.span<{ $tone?: 'blue' | 'green' | 'amber' }>`
  background: ${props => props.$tone === 'blue' ? '#eff6ff' : props.$tone === 'amber' ? '#fffbeb' : '#ecfdf5'};
  color: ${props => props.$tone === 'blue' ? '#2563eb' : props.$tone === 'amber' ? '#b45309' : '#059669'};
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 800;
`;

const Sidebar = styled.aside`
  background: white;
  padding: 16px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 90px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: var(--shadow);

  @media (max-width: 1100px) {
    position: static;
  }
`;

const MovieItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid ${p => p.$active ? 'var(--brand)' : '#edf2f7'};
  background: ${p => p.$active ? '#f0fdf4' : 'white'};
  text-align: left;
  cursor: pointer;
  transition: 0.2s;
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 10px;
  align-items: center;

  &:hover { border-color: var(--brand); }
  h4 { margin-bottom: 4px; color: #1e293b; font-weight: 700; }
  span { font-size: 0.8rem; color: #94a3b8; }

  @media (max-width: 420px) {
    grid-template-columns: 76px 1fr;
  }
`;

const Thumb = styled.div<{ $src: string; $watched?: boolean }>`
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: linear-gradient(rgba(15, 23, 42, ${props => props.$watched ? '0.42' : '0.08'}), rgba(15, 23, 42, ${props => props.$watched ? '0.42' : '0.08'})), url(${props => props.$src});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '▶';
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: white;
    font-size: 1rem;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }
`;

const EmptyState = styled.div`
  padding: 36px 14px;
  text-align: center;
  color: var(--muted);
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
`;

const Notes = styled.textarea`
  width: 100%;
  min-height: 92px;
  margin-top: 18px;
  resize: vertical;
  padding: 13px 14px;
  border-radius: 8px;
  border: 1px solid #dbe4ee;
  outline: none;
  line-height: 1.5;

  &:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
  }
`;

const CinemaPractice = () => {
  const [selectedMovie, setSelectedMovie] = useState(CINEMA_PLAYLIST[0]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Баары');
  const [level, setLevel] = useState('Баары');
  const [watchedIds, setWatchedIds] = useState<string[]>(() => readStringArray('cinema_watched'));
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readStringArray('cinema_favorites'));
  const [notes, setNotes] = useState<Record<string, string>>(() => readNotes());
  const topRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => ['Баары', ...Array.from(new Set(CINEMA_PLAYLIST.map((movie) => movie.category)))], []);
  const levels = useMemo(() => ['Баары', ...Array.from(new Set(CINEMA_PLAYLIST.map((movie) => movie.level)))], []);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return CINEMA_PLAYLIST.filter((movie) => {
      const matchesQuery =
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.description.toLowerCase().includes(normalizedQuery) ||
        movie.category.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'Баары' || movie.category === category;
      const matchesLevel = level === 'Баары' || movie.level === level;

      return matchesQuery && matchesCategory && matchesLevel;
    });
  }, [category, level, query]);

  const activeMovie = filteredMovies.find((movie) => movie.id === selectedMovie.id) || filteredMovies[0] || selectedMovie;

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    if (window.innerWidth < 1100) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleWatched = () => {
    const next = watchedIds.includes(activeMovie.id)
      ? watchedIds.filter((id) => id !== activeMovie.id)
      : [...watchedIds, activeMovie.id];
    setWatchedIds(next);
    localStorage.setItem('cinema_watched', JSON.stringify(next));
  };

  const toggleFavorite = () => {
    const next = favoriteIds.includes(activeMovie.id)
      ? favoriteIds.filter((id) => id !== activeMovie.id)
      : [...favoriteIds, activeMovie.id];
    setFavoriteIds(next);
    localStorage.setItem('cinema_favorites', JSON.stringify(next));
  };

  const updateNote = (value: string) => {
    const next = { ...notes, [activeMovie.id]: value };
    setNotes(next);
    localStorage.setItem('cinema_notes', JSON.stringify(next));
  };

  const watchedCount = watchedIds.length;
  const isWatched = watchedIds.includes(activeMovie.id);
  const isFavorite = favoriteIds.includes(activeMovie.id);

  return (
    <CinemaContainer ref={topRef}>
      <div>
        <Hero>
          <h1>Кино-Театр</h1>
          <p>Түркчө угуу көндүмүн ыр, маданият жана саякат видеолору аркылуу машыктырыңыз.</p>
          <Toolbar>
            <SearchInput
              type="search"
              placeholder="Видео издөө..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Категория">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </Select>
            <Select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Деңгээл">
              {levels.map((item) => <option key={item}>{item}</option>)}
            </Select>
          </Toolbar>
        </Hero>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMovie.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <PlayerWrapper>
              <iframe
                src={`https://www.youtube.com/embed/${activeMovie.id}?rel=0&modestbranding=1&origin=${window.location.origin}`}
                title={activeMovie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </PlayerWrapper>

            <MovieDetails>
              <BadgeRow>
                <Badge $tone="blue">{activeMovie.category}</Badge>
                <Badge>{activeMovie.level}</Badge>
                {isWatched && <Badge $tone="amber">Көрүлдү</Badge>}
              </BadgeRow>
              <h2>{activeMovie.title}</h2>
              <p>{activeMovie.description}</p>
              <ActionRow>
                <ActionButton $active={isWatched} onClick={toggleWatched}>
                  {isWatched ? 'Көрүлгөндөн алуу' : 'Көрдүм'}
                </ActionButton>
                <ActionButton $active={isFavorite} onClick={toggleFavorite}>
                  {isFavorite ? 'Сакталгандан алуу' : 'Сактап коюу'}
                </ActionButton>
                <ActionButton onClick={() => window.open(activeMovie.url, '_blank', 'noopener,noreferrer')}>
                  YouTube ачуу
                </ActionButton>
              </ActionRow>
              <Notes
                value={notes[activeMovie.id] || ''}
                onChange={(event) => updateNote(event.target.value)}
                placeholder="Бул видеодон үйрөнгөн сөздөрдү же фразаларды жазыңыз..."
              />
            </MovieDetails>
          </motion.div>
        </AnimatePresence>
      </div>

      <Sidebar>
        <h3 style={{ marginBottom: '6px', color: 'var(--text)', letterSpacing: 0 }}>
          Видео сабактар
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          {watchedCount} / {CINEMA_PLAYLIST.length} видео көрүлдү
        </p>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '5px' }}>
          {filteredMovies.length === 0 && <EmptyState>Видео табылган жок.</EmptyState>}
          {filteredMovies.map((movie) => (
            <MovieItem
              key={movie.id}
              $active={activeMovie.id === movie.id}
              onClick={() => handleSelect(movie)}
            >
              <Thumb
                $src={`https://img.youtube.com/vi/${movie.id}/hqdefault.jpg`}
                $watched={watchedIds.includes(movie.id)}
              />
              <div>
                <h4>{movie.title}</h4>
                <span>
                  {movie.category} • {movie.level}
                  {favoriteIds.includes(movie.id) ? ' • Сакталган' : ''}
                </span>
              </div>
            </MovieItem>
          ))}
        </div>
      </Sidebar>
    </CinemaContainer>
  );
};

export default CinemaPractice;

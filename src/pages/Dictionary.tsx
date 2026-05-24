import { useState } from 'react';
import styled from 'styled-components';
import { turkishWords, categories } from '../data/words';
import WordCard from '../components/WordCard';

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;

  @media (max-width: 700px) {
    width: min(100% - 24px, 1120px);
    padding-top: 20px;
  }
`;

const SearchWrapper = styled.div`
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: clamp(22px, 4vw, 34px);
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 15px 18px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #dbe4ee;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);

  &:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.12);
  }
`;

/* Категориялар үчүн стильдер */
const CategoryFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid ${props => props.$active ? 'var(--brand)' : '#e5e7eb'};
  background: ${props => props.$active ? 'var(--brand)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--muted)'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--brand);
    background: ${props => props.$active ? '#15803d' : '#f9fbfd'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 16px;
`;

const StatsText = styled.p`
  margin-top: 15px;
  color: #94a3b8;
  font-size: 0.95rem;
`;

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeId, setActiveId] = useState<number | null>(null);
  const query = searchTerm.trim().toLowerCase();

  // 1. Фильтрация логикасы (Категория + Издөө)
  const filteredWords = turkishWords.filter(word => {
    const matchesSearch = 
      word.turkish.toLowerCase().includes(query) ||
      word.kyrgyz.toLowerCase().includes(query) ||
      word.pronunciation.toLowerCase().includes(query);
    
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <SearchWrapper>
        <h1 style={{ marginBottom: '8px', color: 'var(--text)', letterSpacing: 0 }}>Сөздүк</h1>
        <p style={{ marginBottom: '20px', color: 'var(--muted)', textAlign: 'center' }}>
          Түркчө, кыргызча же айтылышы боюнча издеңиз.
        </p>
        <SearchInput 
          type="text" 
          placeholder="Сөздөрдү издөө..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StatsText>
          Табылды: <b>{filteredWords.length}</b> / {turkishWords.length} сөз
        </StatsText>
      </SearchWrapper>

      {/* Категорияларды тандоо */}
      <CategoryFilters>
        <FilterBtn 
          $active={selectedCategory === 'all'} 
          onClick={() => setSelectedCategory('all')}
        >
          Баары
        </FilterBtn>
        {categories.map(cat => (
          <FilterBtn 
            key={cat.id}
            $active={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.title}
          </FilterBtn>
        ))}
      </CategoryFilters>

      {filteredWords.length > 0 ? (
        <Grid>
          {filteredWords.map((word) => (
            <WordCard 
              key={word.id}
              word={word}
              isActive={activeId === word.id}
              onClick={() => setActiveId(activeId === word.id ? null : word.id)}
            />
          ))}
        </Grid>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px 16px', color: '#94a3b8' }}>
          <h2>Сөз табылган жок</h2>
          <p>Башка категорияны же сөздү байкап көрүңүз.</p>
        </div>
      )}
    </Container>
  );
};

export default Dictionary;

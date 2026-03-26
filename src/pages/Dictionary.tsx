import { useState } from 'react';
import styled from 'styled-components';
import { turkishWords, categories } from '../data/words';
import WordCard from '../components/WordCard';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SearchWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 15px 25px;
  font-size: 1.1rem;
  border-radius: 20px;
  border: 2px solid #edf2f7;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);

  &:focus {
    border-color: #2ecc71;
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.1);
  }
`;

/* Категориялар үчүн стильдер */
const CategoryFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 50px;
  border: 2px solid ${props => props.$active ? '#2ecc71' : '#f0f0f0'};
  background: ${props => props.$active ? '#2ecc71' : 'white'};
  color: ${props => props.$active ? 'white' : '#5a6c7d'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2ecc71;
    background: ${props => props.$active ? '#27ae60' : '#f9fbfd'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
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

  // 1. Фильтрация логикасы (Категория + Издөө)
  const filteredWords = turkishWords.filter(word => {
    const matchesSearch = 
      word.turkish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.kyrgyz.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <SearchWrapper>
        <h1 style={{ marginBottom: '25px', color: '#2c3e50' }}>📚 Сөздүк</h1>
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
        <div style={{ textAlign: 'center', padding: '100px', color: '#bdc3c7' }}>
          <h2>🔍 Сөз табылган жок</h2>
          <p>Башка категорияны же сөздү байкап көрүңүз.</p>
        </div>
      )}
    </Container>
  );
};

export default Dictionary;
import { useState, useEffect } from 'react';
import '@/Component/Recipe/Recipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faMartiniGlassCitrus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, RECIPE } from '@/config/host-config';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'top10', 'recommend'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipeList = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${RECIPE}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });

        const serverData = await res.json();

        setRecipes(serverData); // 레시피 데이터를 상태에 업데이트
      } catch (error) {
        console.error('ERROR: ', error);
        setRecipes([]);
      }
    };

    fetchRecipeList();
  }, []);

  // 레시피 모달을 열고 닫는 함수들
  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalOpen(false);
  };

  // 모달 외부를 클릭했을 때 모달을 닫는 함수
  const closeModalOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // ESC키를 누르면 모달을 닫는 함수
  const closeModalESC = (e) => {
    console.log('키: ', e.keyCode);

    if (e.keyCode === 27) {
      closeModal();
    }
  };

  window.addEventListener('keydown', closeModalESC);

  // 검색어 초기화 함수
  const clearSearch = () => {
    setSearchTerm('');
  };

  // 검색어가 입력되었는지 여부를 확인하는 함수
  const isSearchTermEmpty = () => {
    return searchTerm.trim() === '';
  };

  // 검색어에 따라 레시피를 필터링하는 함수
  const searchFilter = (recipe) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      recipe.cocktailName &&
      recipe.cocktailName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };

  // 검색어와 필터에 따라 레시피를 필터링하는 함수
  const filterRecipes = () => {
    // 'all'일 경우 모든 레시피를 가나다 순으로 정렬
    if (filter === 'all') {
      const sortedRecipes = recipes.slice().sort((a, b) => {
        const nameA = a.cocktailName.toUpperCase();
        const nameB = b.cocktailName.toUpperCase();
        return nameA.localeCompare(nameB);
      });

      // 검색어에 따라 레시피를 추가로 필터링
      return sortedRecipes.filter(searchFilter);
    }

    // 'top10'일 경우 상위 10개의 레시피만 반환
    if (filter === 'top10') {
      const top10Ids = recipes
        .slice(0, 10)
        .map((topRecipe) => topRecipe.dataId);
      return recipes.filter(
        (recipe) => top10Ids.includes(recipe.dataId) && searchFilter(recipe)
      );
    }

    // 'recommend'일 경우 알콜 도수가 30 이상인 레시피만 반환
    if (filter === 'recommend') {
      return recipes.filter(
        (recipe) =>
          recipe.recipe &&
          recipe.recipe.includes('알콜 도수') &&
          parseInt(recipe.recipe.split('알콜 도수')[1]) >= 30 &&
          searchFilter(recipe)
      );
    }

    return true;
  };

  return (
    <>
      {/* 상단 로고 및 검색 바 영역 */}
      <p className="recipe_logo">
        Cocktail Recipe
        <FontAwesomeIcon
          icon={faMartiniGlassCitrus}
          className="cocktail__logo"
        />
      </p>
      <div className="container__recipe">
        <ul className="local_search__recipe">
          <li>칵테일 검색</li>
        </ul>
        <div className="search_bar__recipe">
          {/* 검색어 입력창 */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {/* 검색 버튼 */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="button__recipe"
            style={{ display: isSearchTermEmpty() ? 'block' : 'none' }}
          />
          {/* 검색어 초기화 버튼 */}
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className="clear_button__recipe"
              onClick={clearSearch}
              style={{ display: 'block' }}
            />
          )}
        </div>
      </div>
      {/* 카테고리 버튼 영역 */}
      <div className="category">
        <button
          className={`category__button ${filter === 'all' ? 'selected' : ''}`}
          onClick={() => setFilter('all')}
        >
          전체보기
        </button>
        <button
          className={`category__button ${filter === 'top10' ? 'selected' : ''}`}
          onClick={() => setFilter('top10')}
        >
          Top 10
        </button>
        <button
          className={`category__button ${
            filter === 'recommend' ? 'selected' : ''
          }`}
          onClick={() => setFilter('recommend')}
        >
          혼밤이 추천
        </button>
      </div>

      {/* 레시피 카드 영역 */}
      <div className="kategoria">
        {filterRecipes().map((recipe, index) => (
          <div key={recipe.dataId} className="recipe_card">
            {filter === 'top10' && <h2 className="rank">{index + 1}위 </h2>}
            {/* 레시피 이미지 */}
            <img
              src={recipe.cocktailImg}
              alt={recipe.cocktailName}
              className="recipe_image"
              onClick={() => openModal(recipe)}
            />
            {/* 레시피 세부 정보 */}
            <div className="recipe_details">
              {/* 레시피 이름 */}
              <h2 className="name" onClick={() => openModal(recipe)}>
                {recipe.cocktailName}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* 레시피 모달 */}
      {modalOpen && selectedRecipe && (
        <div className="modal" onClick={closeModalOutside}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            {/* 모달 닫기 버튼 */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* 레시피 이미지 */}
            <img
              src={selectedRecipe.cocktailImg}
              className="modal_image"
              alt={selectedRecipe.cocktailName}
            />
            {/* 레시피 세부 정보 */}
            <div className="modal_details">
              <h2>{selectedRecipe.cocktailName}</h2>
              <br />
              {selectedRecipe.recipe && (
                <>
                  <p className="recipe__" style={{ whiteSpace: 'pre-wrap' }}>
                    {`${selectedRecipe.recipe.replace(/\//g, '\n\n')}`}
                  </p>
                </>
              )}
              {selectedRecipe.recipeDetail && (
                <>
                  <p
                    className="recipeDetail__"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {`${selectedRecipe.recipeDetail.replace(/\//g, '\n\n')}`}
                  </p>
                </>
              )}
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;

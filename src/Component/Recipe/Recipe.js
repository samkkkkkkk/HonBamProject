import React, { useEffect, useState } from 'react';
import './Recipe.css';
import data from '../Recipe/CocktailData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faMartiniGlassCitrus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, HONBAM } from '../../config/host-config';

const Recipe = () => {
  const recipeDetailURL = `${API_BASE_URL}${HONBAM}/recipe`;
  const requestHeader = {
    'content-type': 'application/json',
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'top10', 'recommend'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const recipeList = async () => {
      const res = await fetch(recipeDetailURL, {
        method: 'GET',
        headers: requestHeader,
      });

      const json = res.json();
      
    };
  }, []);

  const recipes = data;

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalOpen(false);
  };

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
      (recipe.cname &&
        recipe.cname.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (recipe.mainingredient &&
        recipe.mainingredient.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (recipe.submaterials &&
        recipe.submaterials.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (recipe.provenance &&
        recipe.provenance.toLowerCase().includes(lowerCaseSearchTerm))
    );
  };

  // 검색어와 필터에 따라 레시피를 필터링하는 함수
  const filterRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      // 전체보기(all)일 경우 모든 레시피 반환
      if (filter === 'all') {
        return true;
      }
      // Top 10 레시피 반환
      if (filter === 'top10') {
        return recipes.slice(0, 10).includes(recipe);
      }
      // 추천 레시피 반환 (추가적인 조건에 따라 수정 필요)
      if (filter === 'recommend') {
        // 예시: 알콜 도수가 15 이상인 레시피를 추천으로 표시
        return recipe.degree >= 15;
      }
      return true;
    });

    // 검색어에 따라 레시피를 추가로 필터링
    return filteredRecipes.filter(searchFilter);
  };

  return (
    <>
      {/* 상단 로고 및 검색 바 영역 */}
      <p className='recipe_logo'>
        Cocktail Recipe
        <FontAwesomeIcon
          icon={faMartiniGlassCitrus}
          className='cocktail__logo'
        />
      </p>
      <div className='container'>
        <ul className='local_search'>
          <li>칵테일 검색</li>
        </ul>
        <div className='search_bar'>
          {/* 검색어 입력창 */}
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {/* 검색 버튼 */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='button'
            style={{ display: isSearchTermEmpty() ? 'block' : 'none' }}
          />
          {/* 검색어 초기화 버튼 */}
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className='clear_button'
              onClick={clearSearch}
              style={{ display: 'block' }}
            />
          )}
        </div>
      </div>
      {/* 카테고리 버튼 영역 */}
      <div className='category'>
        <button
          className='category__button'
          onClick={() => setFilter('all')}
        >
          전체보기
        </button>
        <button
          className='category__button'
          onClick={() => setFilter('top10')}
        >
          Top 10
        </button>
        <button
          className='category__button'
          onClick={() => setFilter('recommend')}
        >
          혼밤이 추천
        </button>
      </div>

      {/* 레시피 카드 영역 */}
      <div className='kategoria'>
        {filterRecipes().map((recipe) => (
          <div
            key={recipe.cid}
            className='recipe_card'
          >
            {/* 레시피 이미지 */}
            <img
              src={recipe.imageURL}
              alt={recipe.cname}
              className='recipe_image'
              onClick={() => openModal(recipe)}
            />
            {/* 레시피 세부 정보 */}
            <div className='recipe_details'>
              {/* 레시피 이름 */}
              <h2
                className='name'
                onClick={() => openModal(recipe)}
              >
                {recipe.cname}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* 레시피 모달 */}
      {modalOpen && selectedRecipe && (
        <div className='modal'>
          <div className='modal_content'>
            {/* 모달 닫기 버튼 */}
            <span
              className='close'
              onClick={closeModal}
            >
              &times;
            </span>
            {/* 레시피 이미지 */}
            <img
              src={selectedRecipe.imageURL}
              className='modal_image'
            />
            {/* 레시피 세부 정보 */}
            <div className='modal_details'>
              <h2>{selectedRecipe.cname}</h2>
              <br />
              <p>{`알콜 도수: ${selectedRecipe.degree}`}</p>
              <br />
              <p>{`제조법: ${selectedRecipe.make}`}</p>
              <br />
              <p>{`글라스: ${selectedRecipe.glass}`}</p>
              <br />
              <p>{`주재료: ${selectedRecipe.mainingredient}`}</p>
              <br />
              <p>{`부재료: ${selectedRecipe.submaterials}`}</p>
              <br />
              <p>{`유래: ${selectedRecipe.provenance}`}</p>
              <br />
              <p>{`만드는법: ${selectedRecipe.recipe}`}</p>
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;

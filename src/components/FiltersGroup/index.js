import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderRatingsFilters = () => {
    const {ratingsList} = props
    return (
      <div>
        <h1 className="rating-heading">Rating</h1>
        <ul className="ratings-list">
          {ratingsList.map(rating => {
            const {activeRatingId, changeRating} = props
            const onClickRatingItem = () => changeRating(rating.ratingId)
            const ratingClassName =
              activeRatingId === rating.ratingId
                ? `and-up active-rating`
                : `and-up`
            return (
              <li
                className="rating-item"
                key={rating.ratingId}
                onClick={onClickRatingItem}
              >
                <img
                  src={rating.imageUrl}
                  alt={`rating ${rating.ratingId}`}
                  className="rating-image"
                />
                <p className={ratingClassName}>& up</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderProductCategories = () => {
    const {categoryOptions} = props
    return (
      <>
        <h1 className="category-heading">Category</h1>
        <ul className="categories-list">
          {categoryOptions.map(category => {
            const {activeCategoryId, changeCategory} = props
            const onClickCategoryItem = () =>
              changeCategory(category.categoryId)
            const isActive = category.categoryId === activeCategoryId
            const categoryClassName = isActive
              ? `category-name active-category-name`
              : `category-name`
            return (
              <li
                className="category-item"
                key={category.categoryId}
                onClick={onClickCategoryItem}
              >
                <p className={categoryClassName}>{category.name}</p>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  const renderSearchInput = () => {
    const {enterSearchInput, changeSearchInput} = props
    const onEnterSearchInput = event => {
      if (event.key === 'Enter') {
        enterSearchInput()
      }
    }
    const onChangeSearchInput = event => {
      changeSearchInput(event.target.value)
    }
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup

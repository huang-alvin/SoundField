import "./CategoryTag.css";

function CategoryTag(prop) {
  let category = prop.category;

  return (
    <div className="category-tag">
      {/* <span className="category-button">{category.type}</span> */}
      <button
        className="category-button"
        id={`category-button-${category.id}`}
        value={category.id}
      >
        {category.type}
      </button>
    </div>
  );
}
export default CategoryTag;

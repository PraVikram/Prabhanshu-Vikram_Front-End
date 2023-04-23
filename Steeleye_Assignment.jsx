{/*
Ans 1:
This code defines a React component called List which renders a list of items, where each item is a clickable li element. When an item is clicked, it will be highlighted
 in green, and all other items will be highlighted in red.

The List component takes an array of items as a prop, and maps over this array to render a SingleListItem component for each item. Each SingleListItem receives the 
following props:

index- the index of the current item in the items array
isSelected- a boolean indicating whether the current item is selected or not
onClickHandler- a function to handle the click event on the current item
text- the text to display for the current item
The List component also defines a state variable called selectedIndex using the useState hook, which represents the index of the currently selected item. When an item 
is clicked, the handleClick function updates the selectedIndex state with the index of the clicked item.

Finally, the List component also uses the useEffect hook to reset the selectedIndex state to null whenever the items prop changes, which ensures that the selected item
 is cleared when the list of items is updated.

The WrappedSingleListItem and WrappedListComponent components are wrapped with the memo higher-order component to improve performance by preventing unnecessary
 re-renders of these components when their props do not change.
*/}

{/* Ans-2:
1- PropTypes syntax error:
The PropTypes syntax in the WrappedListComponent definition has an error - the array and shapeOf functions should be called as PropTypes.arrayOf and PropTypes.shape, 
respectively. The correct syntax should be: */}
WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
    })),
  };

{/*
2- Incorrect prop type:
The isSelected prop in the WrappedSingleListItem component is intended to be a boolean indicating whether the item is selected or not. However, in the component 
definition, it is passed the selectedIndex state, which is a number. This could cause unexpected behavior when rendering the list items. To fix this, the isSelected 
prop should be passed a boolean value based on whether the current item's index matches the selectedIndex state. The updated SingleListItem component code should be: 
*/}
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
    return (
      <li
        style={{ backgroundColor: isSelected ? 'green' : 'red'}}
        onClick={() => onClickHandler(index)}
      >
        {text}
      </li>
    );
  });

{/*
3- onClickHandler function:
In the SingleListItem component, the onClick handler is not properly passed as a function. Instead, it is invoked immediately with the index value. To fix this,
 the onClick handler should be wrapped in an arrow function so that it is only invoked when the li element is clicked, like this:
*/}
onClick={() => onClickHandler(index)}

{/*
Ans-3:
*/}
import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={handleClick}
    >
      {index}: {isSelected ? 'Selected' : 'Not Selected'}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(index => {
    setSelectedIndex(index);
  }, []);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items &&
        items.map((item, index) => (
          <SingleListItem
            key={index}
            onClick={handleClick}
            index={index}
            isSelected={selectedIndex === index}
          />
        ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

export default List;

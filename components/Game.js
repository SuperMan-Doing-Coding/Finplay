// components/Game.js
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Game = () => {
  const [categories, setCategories] = useState({
    Equity: ['Stocks', 'Index Funds'],
    Debt: ['Bonds', 'Treasury Bills'],
    RealEstate: ['REITs'],
  });

  const [assets, setAssets] = useState({
    Equity: [],
    Debt: [],
    RealEstate: [],
  });

  const [feedback, setFeedback] = useState('');

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    let correct = false;

    if (destinationCategory === 'Equity' && (categories[destinationCategory].includes('Stocks') || categories[destinationCategory].includes('Index Funds'))) {
      correct = true;
    } else if (destinationCategory === 'Debt' && (categories[destinationCategory].includes('Bonds') || categories[destinationCategory].includes('Treasury Bills'))) {
      correct = true;
    } else if (destinationCategory === 'RealEstate' && categories[destinationCategory].includes('REITs')) {
      correct = true;
    }

    if (correct) {
      setFeedback('Well done! This is a correct allocation.');
    } else {
      setFeedback('Oops! You can try again.');
    }

    // Continue with asset movement logic
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="categories">
          {['Equity', 'Debt', 'RealEstate'].map((category) => (
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div
                  className="category"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{category}</h2>
                  {categories[category].map((item, index) => (
                    <Draggable
                      key={item}
                      draggableId={item}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="asset"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <p>{feedback}</p>
    </div>
  );
};

export default Game;

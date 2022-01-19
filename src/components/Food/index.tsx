import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';

export default function Food({ food, handleEditFood, handleDelete }) {
  // class Food extends Component {
  // constructor(props) {
  //  super(props);
  const { available } = food;
  // const { available } = this.props.food;
  //  this.state = {
  //    isAvailable: available  - inicia como available
  //  };
  const [isAvailable, setIsAvailable] = useState(available)
  // toggleAvailable = async () => { - é uma função
  //  const { food } = this.props; - já está acima
  //  const { isAvailable } = this.state; - já está acima
  //
  //  await api.put(`/foods/${food.id}`, {
  //    ...food,
  //   available: !isAvailable,
  //  });
  // 
  //  this.setState({ isAvailable: !isAvailable }); - true ou false
  //  }
  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  }
  //  setEditingFood = () => { - é uma função também
  //    const { food, handleEditFood } = this.props; - handleEditFood vem de props
  //  
  //    handleEditFood(food);
  //  }
  const setEditingFood = () => {
    handleEditFood(food);
  }

  return(
    <Container available={isAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={this.setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={this.toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
  );
  
}


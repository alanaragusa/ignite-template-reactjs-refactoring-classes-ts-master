import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface InfoFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface AddFood {
  image:string;
  name:string;
  price:string;
  description:string;
}

export default function Dashboard() {
//  constructor(props) {
//    super(props);
//    this.state = {
//      foods: [],
//      editingFood: {},
//      modalOpen: false,
//      editModalOpen: false,
//    }  
  const [foods, setFoods] = useState<InfoFood[]>([])
  const [editingFood, setEditingFood] = useState<InfoFood>({} as InfoFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

//  async componentDidMount() {
//    const response = await api.get('/foods');
//
//    this.setState({ foods: response.data });
//  }  
  useEffect(() => {
    async function getFood() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }
    getFood()
  }, [])
  
//  handleAddFood = async food => {
//    const { foods } = this.state;
//
//    try {
//      const response = await api.post('/foods', {
//        ...food,
//        available: true,
//     });  
  const handleAddFood = async (food: AddFood): Promise<void> => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

//  handleUpdateFood = async food => {
//    const { foods, editingFood } = this.state;
//
//    try {
//      const foodUpdated = await api.put(
//        `/foods/${editingFood.id}`,
//        { ...editingFood, ...food },
//      );
//
//      const foodsUpdated = foods.map(f =>
//        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
//      );
//
//      this.setState({ foods: foodsUpdated });
//    } catch (err) {
//      console.log(err);
//    }
//  }
  const handleUpdateFood = async (food: AddFood): Promise<void> => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

//  handleDeleteFood = async id => {
//    const { foods } = this.state;
//
//    await api.delete(`/foods/${id}`);
//
//    const foodsFiltered = foods.filter(food => food.id !== id);
//
//    this.setState({ foods: foodsFiltered });
//  }
  const handleDeleteFood = async (id: number) => {
  await api.delete(`/foods/${id}`);

  const foodsFiltered = foods.filter(food => food.id !== id);

  setFoods(foodsFiltered);
  }

//  toggleModal = () => {
//    const { modalOpen } = this.state;
//
//    this.setState({ modalOpen: !modalOpen });
//  }
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

//  toggleEditModal = () => {
//    const { editModalOpen } = this.state;
//
//    this.setState({ editModalOpen: !editModalOpen });
//  }
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

//  handleEditFood = food => {
//    this.setState({ editingFood: food, editModalOpen: true });
//  }
  const handleEditFood = (food: InfoFood) => {
    setEditModalOpen(true)
    setEditingFood(food);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

}  

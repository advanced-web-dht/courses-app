import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import { AppState } from '../../reducers';
import { ClassesHeader } from '../classes/style';
import Grade from './grade';
import Container from '../UI/Container';
import AddGrade from './addGrade';
import { reorder } from './helper';
import { UpdatePointPartOrder } from '../../api/client';
import { ListGrade } from './style';
import { updateOrder } from './action';

const ClassGrade: React.FC = () => {
  const { grades, info: currentClass } = useSelector((state: AppState) => state.currentClass);
  const dispatch = useDispatch();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newGrades = reorder(grades, result.source.index, result.destination.index);
    dispatch(updateOrder(newGrades));

    const newOrder = newGrades.map((grade, index) => ({ id: grade.id, order: index }));
    const response = await UpdatePointPartOrder(currentClass?.id as number, newOrder);
    if (!response) {
      toast.error('Thay đổi thứ tự không thảnh công!');
    }
  };

  return (
    <Container>
      <ClassesHeader>
        <div>Cấu trúc điểm</div>
      </ClassesHeader>
      <ListGrade>
        {isReady && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='list'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {grades?.map((item, index) => (
                    <Grade grade={item} index={index} key={item.id} classId={item.classId} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <AddGrade newOrder={grades.length} classId={currentClass?.id as number} />
      </ListGrade>
    </Container>
  );
};

export default ClassGrade;

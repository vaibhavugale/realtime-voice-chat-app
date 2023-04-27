import React from 'react'
import Button from '../../../components/shared/Button/Button'
import CardContainer from '../../../components/shared/card/CardContainer'
import Input from '../../../components/shared/Input/Input'
import { useSelector } from 'react-redux'
const StepAvatar = ({onNext}) => {

  const {name} = useSelector(state => state.activationSlice)
  return (
    <div className={  `Centre container`}>
    
    <CardContainer img={'/images/icon/lockEmoji.png'} title={`Okay, ${name}`}>
    <div>
    <Input
   
    ></Input>
    </div>
    
    <Button buttonText={'Next'} onclick={onNext}></Button>
    </CardContainer>

   </div>
  )
}

export default StepAvatar
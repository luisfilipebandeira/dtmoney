import Modal from 'react-modal'

import { 
  Container,
  TransactionTypeContainer,
  RadioBox
} from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outComeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransaction'

interface Props{
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({isOpen, onRequestClose}: Props){
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [value, setValue] = useState(0)

  const {createTransaction} = useTransactions()

  async function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault()

    await createTransaction({
      title,
      amount: value,
      category,
      type   
    })

    setTitle('')
    setType('deposit')
    setCategory('')
    setValue(0)

    onRequestClose()
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          type="text" 
          placeholder="Titulo"
          value={title}  
          onChange={(event => setTitle(event.target.value))}
        />

        <input 
          type="number" 
          placeholder="Valor" 
          value={value}
          onChange={(event => setValue(Number(event.target.value)))}
        />

        <TransactionTypeContainer>
          <RadioBox 
            type="button" 
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type="button" 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}  
            activeColor="red"
          >
            <img src={outComeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          type="text" 
          placeholder="Categoria" 
          value={category}
          onChange={(event => setCategory(event.target.value))}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
    )
}
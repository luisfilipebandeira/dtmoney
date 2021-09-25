import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface TransactionType {
    id: string
    title: string
    type: string
    category: string
    amount: number
    createdAt: Date
}

interface TransactionProviderProps {
    children: ReactNode
}

interface TransactionContextData {
    transactions: TransactionType[],
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

type TransactionInput = Omit<TransactionType, 'id' | 'createdAt'>

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionProvider({children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<TransactionType[]>([])

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput){
        console.log(transactionInput)
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const {transaction} = response.data
        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionsContext.Provider 
            value={{
                transactions, 
                createTransaction
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)

    return context
}
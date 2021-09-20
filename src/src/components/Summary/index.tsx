import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

export function Summary(){
    return(
        <Container>
            <div>
                <header>
                    <p>entradas</p>
                    <img src={incomeImg} alt="entradas" />
                </header>
                <strong>R$12000,00</strong>
            </div>

            <div>
                <header>
                    <p>saidas</p>
                    <img src={outcomeImg} alt="entradas" />
                </header>
                <strong>- R$1000,00</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>total</p>
                    <img src={totalImg} alt="entradas" />
                </header>
                <strong>R$11500,00</strong>
            </div>
        </Container>
    )
}
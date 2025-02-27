import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);

  const handleNumberClick = (number) => {
    if (calculationComplete) {
      setDisplay(String(number));
      setExpression('');
      setOperator(null);
      setFirstValue(null);
      setWaitingForSecondValue(false);
      setCalculationComplete(false);
    } else if (waitingForSecondValue) {
      setDisplay(String(number));
      setWaitingForSecondValue(false);
      setExpression(`${firstValue} ${operator} ${number}`);
    } else {
      setDisplay(display === '0' ? String(number) : display + number);

      // Update expression if operator exists
      if (operator) {
        setExpression(`${firstValue} ${operator} ${display === '0' ? number : display + number}`);
      }
    }
  };

  const handleOperatorClick = (op) => {
    if (calculationComplete) {
      setOperator(op);
      setWaitingForSecondValue(true);
      setExpression(`${display} ${op}`);
      setFirstValue(parseFloat(display));
      setCalculationComplete(false);
    } else if (operator && !waitingForSecondValue) {
      calculate();
      setOperator(op);
      setWaitingForSecondValue(true);
      setExpression(`${display} ${op}`);
      setFirstValue(parseFloat(display));
    } else {
      const currentValue = parseFloat(display);
      setFirstValue(currentValue);
      setOperator(op);
      setWaitingForSecondValue(true);
      setExpression(`${currentValue} ${op}`);
    }
  };

  const calculate = () => {
    if (operator === null || firstValue === null) return;

    const secondValue = parseFloat(display);
    let result;

    switch (operator) {
      case '+':
        result = firstValue + secondValue;
        break;
      case '-':
        result = firstValue - secondValue;
        break;
      case '*':
        result = firstValue * secondValue;
        break;
      case '/':
        result = firstValue / secondValue;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setExpression(`${firstValue} ${operator} ${secondValue} = ${result}`);
    setOperator(null);
    setFirstValue(result);
    setWaitingForSecondValue(true);
    setCalculationComplete(true);
  };

  const clearSingleDigit = () => {
    if (waitingForSecondValue) {
      return;
    }

    if (calculationComplete) {
      return;
    }

    if (display.length > 1) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);

      if (operator) {
        setExpression(`${firstValue} ${operator} ${newDisplay}`);
      }
    } else {
      setDisplay('0');
      if (operator) {
        setExpression(`${firstValue} ${operator}`);
      } else {
        setExpression('');
      }
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
    setOperator(null);
    setFirstValue(null);
    setWaitingForSecondValue(false);
    setCalculationComplete(false);
  };

  return (
  <div className="bg-warning-subtle min-vh-100 d-flex flex-column">
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="justify-content-center text-danger text-center">Simple Calculator</h1><br></br><br></br>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 bg-light border">
                <div className="p-2 text-end text-secondary">
                  <h6>{expression}</h6>
                </div>
                <div className="p-2 text-end">
                  <h2>{display}</h2>
                </div>
              </div>
              <Row className="g-2 mb-2">
                <Col xs={6}>
                  <Button variant="danger" className="w-100 fw-bold" onClick={clearAll}>AC</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="warning" className="w-100 fw-bold" onClick={clearSingleDigit}>CE</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="primary" className="w-75 fw-bold" onClick={() => handleOperatorClick('/')}>÷</Button>
                </Col>
              </Row>
              <Row className="g-2 mb-2">
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(7)}>7</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(8)}>8</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(9)}>9</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="primary" className="w-75 fw-bold" onClick={() => handleOperatorClick('*')}>×</Button>
                </Col>
              </Row>
              <Row className="g-2 mb-2">
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(4)}>4</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(5)}>5</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(6)}>6</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="primary" className="w-75 fw-bold" onClick={() => handleOperatorClick('-')}>-</Button>
                </Col>
              </Row>
              <Row className="g-2 mb-2">
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(1)}>1</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(2)}>2</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(3)}>3</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="primary" className="w-75 fw-bold" onClick={() => handleOperatorClick('+')}>+</Button>
                </Col>
              </Row>
              <Row className="g-2">
                <Col xs={6}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => handleNumberClick(0)}>0</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="dark" className="w-100 fw-bold" onClick={() => {
                    if (!display.includes('.') && !calculationComplete) {
                      setDisplay(display + '.');
                      if (operator) {
                        setExpression(`${firstValue} ${operator} ${display}.`);
                      }
                    } else if (calculationComplete) {
                      setDisplay('0.');
                      setExpression('');
                      setOperator(null);
                      setFirstValue(null);
                      setWaitingForSecondValue(false);
                      setCalculationComplete(false);
                    }
                  }}>.</Button>
                </Col>
                <Col xs={3}>
                  <Button variant="success" className="w-75 fw-bold" onClick={() => calculate()}>=</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Calculator;
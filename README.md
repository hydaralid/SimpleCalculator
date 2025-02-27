Simple Calculator

![Screenshot 2025-02-27 203202](https://github.com/user-attachments/assets/b91d4c4e-60e6-4628-a5f7-68b86cb637fb)


### Features  
- Perform basic arithmetic operations: **addition, subtraction, multiplication, and division**.  
- **Responsive design** that adapts to all screen sizes.  
- **Expression display** to show the current calculation in progress.  
- **Clear All (AC) and Clear Entry (CE)** functionalities.  
- **Decimal point support** for precise calculations.  
- **Chain calculations** to perform multiple operations in sequence.  

### Technologies Used  
- **React.js**  
- **React Bootstrap**  
- **CSS3**  

### Usage  
- **Numbers (0-9):** Enter numeric values.  
- **Operators (+, -, ×, ÷):** Select an arithmetic operation.  
- **Equal (=):** Compute the final result.  
- **AC (All Clear):** Reset the calculator and start fresh.  
- **CE (Clear Entry):** Remove the last entered digit.  
- **Decimal (.):** Add a decimal point (limited to one per number).  

### How It Works  
The calculator maintains state using **React hooks**, managing:  
- **display:** The currently visible number or result.  
- **expression:** The full mathematical expression being calculated.  
- **operator:** The selected arithmetic operation.  
- **firstValue:** The first operand.  
- **waitingForSecondValue:** A flag indicating if input is expected for the second operand.  
- **calculationComplete:** A flag signaling whether a calculation has been completed.  

The logic ensures:  
- New calculations start properly after a previous one finishes.  
- Users can chain multiple operations seamlessly.  
- The expression display updates correctly with each input.  
- Decimal point input is handled correctly to prevent multiple decimal entries.

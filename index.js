
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
  return {
    firstName : firstName,
    familyName, familyName,
    title: title,
    payPerHour: payPerHour, 
    timeInEvents: [],
    timeOutEvents: [],
  }
} 

function createEmployeeRecords(arrrayofArrays) {
    return arrrayofArrays.map(employeeRecords => createEmployeeRecord(employeeRecords))
}  


function createTimeInEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    }) 
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, hour] = dateStamp.split(" ")

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date == date)

    const timeInHour = timeInEvent.hour
    const timeOutHour = timeOutEvent.hour

    const  hoursWorked = (timeOutHour - timeInHour) / 100
    return hoursWorked
} 

function wagesEarnedOnDate(employeeRecord, date ){

    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)

    const employeePay = employeeRecord.payPerHour

    const wages = (hoursWorked * employeePay)

    return wages
} 


function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
} 

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);

    return totalPayroll;
}


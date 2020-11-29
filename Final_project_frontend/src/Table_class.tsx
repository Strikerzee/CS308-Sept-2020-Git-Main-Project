import * as React from 'react';
// import cx from 'classnames';
import * as ReactDOM from 'react-dom'
import {ListGroup, Container, Input, Row, Table, ListGroupItem, Col, CardBody, Button } from 'reactstrap';
import "./style.css";

type form_elem = React.ChangeEvent<HTMLInputElement>;
interface schedule {
    A: string[],
    B: string[],
    C: string[],
    D: string[],
    E: string[],
    F: string[],
    G: string[],
    H: string[]
  }

interface inpp {
  value: number
}


export class Table_class extends React.Component <{}, {schedule_state: schedule, schedule_errors: schedule, uns: string[], clashMatrix: Map<string, string[]>, courseList: string[]}> {
  state :{
    schedule_state: schedule,
    schedule_errors: schedule,
    uns: string[],
    clashMatrix: Map<string, string[]>,
    courseList: string[],
  }

  num_rows:number = 9;
  rows = []

  temp:schedule;
  temp_errors:schedule;
  vmNull: string[] = []
  vmA: string[] = [];
  vmB: string[] = [];
  vmC: string[] = [];
  vmD: string[] = [];
  vmE: string[] = [];
  vmF: string[] = [];
  vmG: string[] = [];
  vmH: string[] = [];

  constructor(props){
    super(props);

    for(let i:number = 0;i < this.num_rows; ++i)
    {
      this.vmNull.push('');
      this.vmA.push('');
      this.vmB.push('');
      this.vmC.push('');
      this.vmD.push('');
      this.vmE.push('');
      this.vmF.push('');
      this.vmG.push('');
      this.vmH.push('');
    }
    this.temp = {A: this.vmA, B: this.vmB, C: this.vmC , D: this.vmD , E: this.vmE , F: this.vmF , G: this.vmG , H: this.vmH};

    this.temp_errors = {
      A: this.vmNull.slice(), 
      B: this.vmNull.slice(),
      C: this.vmNull.slice(),
      D: this.vmNull.slice(),
      E: this.vmNull.slice(),
      F: this.vmNull.slice(),
      G: this.vmNull.slice(),
      H: this.vmNull.slice()
    }

    this.state = {
      schedule_state: this.temp,
      schedule_errors: this.temp_errors,
      uns: [],
      clashMatrix: new Map<string, string[]>(),
      courseList: []
    }


    let data = this.getClashes();

    this.ObjectRow = this.ObjectRow.bind(this);
    this.getClashes = this.getClashes.bind(this);
    this.putTT = this.putTT.bind(this);
    this.Give_confilicts = this.Give_confilicts.bind(this);
    this.Get_Courses_In_Schedule = this.Get_Courses_In_Schedule.bind(this);
    
    for (var i = 0; i < this.num_rows; i++) {
      this.rows.push(<this.ObjectRow value={i}/>); 
    }
  }

  async getClashes() {
    console.log("getting clashes")
    let url = "/api/endpoint";
    try{
      let res = await fetch(url);
      let ret:Map<string, string[]> = await res.json();
      let newMap =  new Map<string, string[]>();

      for(let key in ret) {
        newMap.set(key, ret[key]);
      }

      this.setState({clashMatrix : newMap});

      this.setState({courseList: Array.from(this.state.clashMatrix.keys())});

      return ret;
    }
    catch (error) {
      console.log(error);
    }
  }

  async putTT() {
    let url = "/api/update";
    console.log("puttinggggg")
    console.log(JSON.stringify(this.state.schedule_state))
    try{
      await fetch(url, {
          method:"PUT",
          cache: "no-cache",
          headers:{
              "content_type":"application/json",
          },
          body:JSON.stringify(this.state.schedule_state)
        }
      ).then(response => {
        console.log(response);
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  Get_Courses_In_Schedule(): string[]
  {
    let tempry:string[] = []
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.A[i]))
        tempry.push(this.state.schedule_state.A[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.B[i]))
        tempry.push(this.state.schedule_state.B[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.C[i]))
        tempry.push(this.state.schedule_state.C[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.D[i]))
        tempry.push(this.state.schedule_state.D[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.E[i]))
        tempry.push(this.state.schedule_state.E[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.F[i]))
        tempry.push(this.state.schedule_state.F[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.G[i]))
        tempry.push(this.state.schedule_state.G[i]);
    }
    for(let i = 0; i < this.num_rows; ++i)
    {
      if(this.state.courseList.includes(this.state.schedule_state.H[i]))
        tempry.push(this.state.schedule_state.H[i]);
    }
    tempry.sort();
    return tempry;
  }

  Give_confilicts(SlotValue: string[], SlotName: string): any[]
  {
    let tempr:string[] = []
    let tempindex = []
    for(let j = 0; j < this.num_rows; ++j)
    {
      if(SlotValue[j].length < 5)
        continue;

      else if(this.state.courseList.includes(SlotValue[j]))
      {
        let cons = this.state.clashMatrix.get(SlotValue[j]);
        
        for(let i = 0; i < this.num_rows;++i)
        {
          if(cons.includes(SlotValue[i]))
          {
            let er = "There is a clash in " + SlotValue[j] + " and " + SlotValue[i] + " in Slot " + SlotName;
            tempr.push(er);
            tempindex.push(j);
            tempindex.push(i);
          }
        }
      }

      else
      {
        let er = "The course " + SlotValue[j] + " at " + SlotName + (j+1).toString() + " does not exist";
        tempindex.push(j);
        tempr.push(er);
      }
    }
    return [tempr, tempindex];
  }

  Check_constraints(): void
  {

    let tempo:string[] = [];
    let temp_schedule = this.state.schedule_errors;

    let [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.A, "A")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.A[i] = "dangerClass";
      else temp_schedule.A[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.B, "B")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.B[i] = "dangerClass";
      else temp_schedule.B[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.C, "C")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.C[i] = "dangerClass";
      else temp_schedule.C[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.D, "D")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }
    
    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.D[i] = "dangerClass";
      else temp_schedule.D[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.E, "E")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.E[i] = "dangerClass";
      else temp_schedule.E[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.F, "F")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.F[i] = "dangerClass";
      else temp_schedule.F[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.G, "G")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }

    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.G[i] = "dangerClass";
      else temp_schedule.G[i] = "";
    }

    [errorMessage, errorIndex] = this.Give_confilicts(this.state.schedule_state.H, "H")
    for(let i = 0; i < errorMessage.length; ++i)
    {
      tempo.push(errorMessage[i]);
    }
    
    for(let i=0; i< this.num_rows; ++i) {
      if(errorIndex.includes(i)) temp_schedule.H[i] = "dangerClass";
      else temp_schedule.H[i] = "";
    }

    this.setState({schedule_errors: temp_schedule});

    console.log(tempo);
    let tempry = this.Get_Courses_In_Schedule();

    for(let i = 1; i < tempry.length ; ++i )
    {
      if(tempry[i] == tempry[i-1])
      {
        let j = 2;
        for(;((i < tempry.length) && (tempry[i] == tempry[i+1]));)
        {
          j = j + 1;
          i = i + 1;
        }
        let er = "The " + tempry[i] + " has repeated " + j + " times";
        tempo.push(er);
      }
    }
    this.setState({uns: tempo});
    
  }

  getA(event: form_elem, inp:number) {
      
      const val:string = event.target.value;
      let temp:schedule = this.state.schedule_state;
      temp.A[inp] = val;
      this.setState({schedule_state: temp});
      this.Check_constraints();
  }

  getB(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.B[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getC(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.C[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getD(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.D[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getE(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.E[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getF(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.F[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getG(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.G[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  getH(event: form_elem, inp:number) {
      
    const val:string = event.target.value;
    let temp:schedule = this.state.schedule_state;
    temp.H[inp] = val;
    this.setState({schedule_state: temp});
    this.Check_constraints();
  }

  ObjectRow(inp){
      return (
        <tr>
          
          <td><Input onChange={(eA) => this.getA(eA, inp.value)} value={this.state.schedule_state.A[inp]}/></td>
          <td><Input onChange={(eB) => this.getB(eB, inp.value)} value={this.state.schedule_state.B[inp]}/></td>
          <td><Input onChange={(eC) => this.getC(eC, inp.value)} value={this.state.schedule_state.C[inp]}/></td>
          <td><Input onChange={(eD) => this.getD(eD, inp.value)} value={this.state.schedule_state.D[inp]}/></td>
          <td><Input onChange={(eE) => this.getE(eE, inp.value)} value={this.state.schedule_state.E[inp]}/></td>
          <td><Input onChange={(eF) => this.getF(eF, inp.value)} value={this.state.schedule_state.F[inp]}/></td>
          <td><Input onChange={(eG) => this.getG(eG, inp.value)} value={this.state.schedule_state.G[inp]}/></td>
          <td><Input onChange={(eH) => this.getH(eH, inp.value)} value={this.state.schedule_state.H[inp]}/></td>
          
        </tr>
      )
    }
    
  render() {  
    let num = new Array(this.num_rows);
    for(let i = 0; i< this.num_rows; ++i)
      num[i] = i;

    return(
      <div>
        <h1>Timetable Assist Tool</h1>
        <Row>
          <Col xs="8">
            <div className="paddy"> 
              <Table>
                <thead className="thead">
                  <tr>
                    <th style = 
                    {{backgroundColor: "#BAA7D9"}}>A</th>
                    <th style = 
                    {{backgroundColor: "#8CBBD1"}}>B</th>
                    <th style = 
                    {{backgroundColor: "#7CC477"}}>C</th>
                    <th style =
                    {{backgroundColor: "#FBE164"}}>D</th>
                    <th style = 
                    {{backgroundColor: "#FABC55"}}>E</th>
                    <th style = 
                    {{backgroundColor: "#B85E44"}}>F</th>
                    <th style = 
                    {{backgroundColor: "#F68E8E"}}>G</th>
                    <th style =
                    {{backgroundColor: "#C289AF"}}>H</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    num.map((inp) => {
                      return(
                        <tr>
                          <td className={this.state.schedule_errors.A[inp]}><Input onChange={(eA) => this.getA(eA, inp)} value={this.state.schedule_state.A[inp]}/></td>
                          <td className={this.state.schedule_errors.B[inp]}><Input onChange={(eB) => this.getB(eB, inp)} value={this.state.schedule_state.B[inp]}/></td>
                          <td className={this.state.schedule_errors.C[inp]}><Input onChange={(eC) => this.getC(eC, inp)} value={this.state.schedule_state.C[inp]}/></td>
                          <td className={this.state.schedule_errors.D[inp]}><Input onChange={(eD) => this.getD(eD, inp)} value={this.state.schedule_state.D[inp]}/></td>
                          <td className={this.state.schedule_errors.E[inp]}><Input onChange={(eE) => this.getE(eE, inp)} value={this.state.schedule_state.E[inp]}/></td>
                          <td className={this.state.schedule_errors.F[inp]}><Input onChange={(eF) => this.getF(eF, inp)} value={this.state.schedule_state.F[inp]}/></td>
                          <td className={this.state.schedule_errors.G[inp]}><Input onChange={(eG) => this.getG(eG, inp)} value={this.state.schedule_state.G[inp]}/></td>
                          <td className={this.state.schedule_errors.H[inp]}><Input onChange={(eH) => this.getH(eH, inp)} value={this.state.schedule_state.H[inp]}/></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs="4">
            <div>
              <CardBody>
                <h2>Instructions</h2>
                <p>Please visit this <a href="https://docs.google.com/spreadsheets/d/1tG0vonNYzcrHpdN1_dXkclRs8FZYm88bOgnWSYh7zw0/edit?usp=drivesdk" target="_blank">sheet</a> and fill in the course-instructor details and clash course groups. Click the button below to update the app with the sheet details.</p>
                <Button onClick={(m) => this.getClashes()}>Update</Button>
                <p>  </p>
                <Button onClick={(m) => this.putTT()}>Save</Button>
              </CardBody>
            </div>
              <div className="nopaddy">
                <ListGroup className="nopaddy">
                {this.state.uns.length == 0? <ListGroupItem className="justify-content-between" color="success">All good here!</ListGroupItem> :
                this.state.uns.map((un) => <ListGroupItem className="justify-content-between" color="danger">{un}</ListGroupItem>)}
                </ListGroup>
              </div>
          </Col>
        </Row>
      </div>
    )
  }
}
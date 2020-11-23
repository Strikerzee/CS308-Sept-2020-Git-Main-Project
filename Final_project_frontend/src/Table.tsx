import * as React from 'react';
import {ListGroup, Container, Input, Row, Table, ListGroupItem, Col } from 'reactstrap';

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

function Table_Form () {

  
  // const [m,setM] = React.useState('');
  let num_rows:number = 30;
  let courseList:string[] = [ 'HS102' , 'HS104', 'HS302', 'HS122', 'HS239', 'CS304', 'HS510', 'CS902', 'CS204' ];
  let constraints = new Map<string, string[]>();
  let vaa = ['HS104', 'HS302'];
  constraints.set('HS102', vaa);
  vaa = ['HS102', 'HS122'];
  constraints.set('HS104', vaa);
  // let uns:string[] = [];
  let vm: string[] = [];
  for(let i:number = 0;i < num_rows; ++i)
  {
    vm.push('');
  }
  let temp:schedule = {A: vm, B: vm, C: vm , D: vm , E: vm , F: vm , G: vm , H: vm};
  const [schedule_state, setSchedule] = React.useState<schedule>(temp);
  let h = "hiii";
  vm = [];
  vm.push(h);
  vm.push(h);
  const [uns,setUns] = React.useState<string[]>(vm);
  
  function Check_constraints(slot:string[], val:string): void
  {
    
    if(val.length != 5)
      return;
    
    if(!courseList.includes(val))
    {
       let er = "The course " + val + " Does not exist";
       let tempo = uns;
       tempo.push(er);
       setUns(tempo);
       console.log(uns);
    }
    else
    {
      let cons = constraints.get(val)
      for(let i = 0; i < slot.length;++i)
      {
        // console.log(slot[i])
        if(cons.includes(slot[i]))
        {
          let er = "There is a clash in " + val + " and " + slot[i];
          let tempo = uns;
          tempo.push(er);
          setUns(tempo);
          console.log(uns);
        }
      }
    }
  }

  function isExistInAllList(val:string): boolean
  {


    if(schedule_state.A.includes(val))
    {

      let er = val + " Already exist in slot A";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.B.includes(val))
    {
      let er = val + " Already exist in slot B";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.C.includes(val))
    {
      let er = val + " Already exist in slot C";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.D.includes(val))
    {
      let er = val + " Already exist in slot D";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.E.includes(val))
    {
      let er = val + " Already exist in slot E";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.F.includes(val))
    {
      let er = val + " Already exist in slot F";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.G.includes(val))
    {
      let er = val + " Already exist in slot G";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    else if(schedule_state.H.includes(val))
    {
      let er = val + " Already exist in slot H";
      let tempo = [];
      tempo.push(er);
      setUns(tempo);
      return true
    }
    return false;
  }
  function getA(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.A[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.A, val);
    console.log(schedule_state);

  }

  function getB(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.B[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.B, val);

  }

  function getC(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.C[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.C, val);

  }

  function getD(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.D[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.D, val);

  }

  function getE(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.B[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.E, val);

  }

  function getF(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.F[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.F, val);

  }
  function getG(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.G[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.G, val);

  }

  function getH(event: form_elem, inp) {
    const val:string = event.target.value;
    // setM(val);
    isExistInAllList(val);
    let temp:schedule = schedule_state;
    temp.H[inp.inp] = val;
    setSchedule(temp);
    Check_constraints(schedule_state.H, val);

  }

 

  function ObjectRow(inp){
    return (
      <tr>
        
        <th scope="row"><Input onChange={e => getA(e, inp)} value={schedule_state.A[inp]}/></th>
        <td><Input onChange={eb => getB(eb , inp)}value={schedule_state.B[inp]}/></td>
        <td><Input onChange={e => getC(e, inp)} value={schedule_state.C[inp]}/></td>
        <td><Input onChange={e => getD(e, inp)} value={schedule_state.D[inp]}/></td>
        <td><Input onChange={e => getE(e, inp)} value={schedule_state.E[inp]}/></td>
        <td><Input onChange={e => getF(e, inp)} value={schedule_state.F[inp]}/></td>
        <td><Input onChange={e => getG(e, inp)} value={schedule_state.G[inp]}/></td>
        <td><Input onChange={e => getH(e, inp)} value={schedule_state.H[inp]}/></td>
      </tr>
    )
  }

  // function Tee(){
  //   console.log('In TEEEEEEEE')
  //   return(
      
  //       {uns.map((un) => {
  //       console.log('INNNNNNNNNNNNNNNNN')
  //       return(<p>{un}</p>)})}
      
  //   )
  // }
  
  var rows = [];
  for (var i = 0; i < num_rows; i++) {
    rows.push(<ObjectRow inp={i}/>);
  }
    return (
      
      // <Container>
      //   <Row>
      //   <Col>
        <Table>
            <thead>
              <tr>
                
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
                <th>F</th>
                <th>G</th>
                <th>H</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
            
          </Table>
       
        
       
          
          
         
     
          
          
          
          
         
      
      );
}

export {
    Table_Form
}

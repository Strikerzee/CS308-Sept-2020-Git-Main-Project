import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {ListGroup, Container, Input, Row, Table, ListGroupItem, Col, CardBody } from 'reactstrap';

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
export class Table_class extends React.Component <{}, {schedule_state: schedule, uns: string[]}> {
    num_rows:number = 30;
    rows = []
    courseList:string[] = [ 'HS102' , 'HS104', 'HS302', 'HS122', 'HS239', 'CS304', 'HS510', 'CS902', 'CS204' ];
    constraints = new Map<string, string[]>();
    vaa = ['HS104', 'HS302'];
    vab = [ 'HS122'];
    temp:schedule;
    vmA: string[] = [];
    vmB: string[] = [];
    vmC: string[] = [];
    vmD: string[] = [];
    vmE: string[] = [];
    vmF: string[] = [];
    vmG: string[] = [];
    vmH: string[] = [];
    state :{
      schedule_state: schedule,
      uns: string[]
    }

    constructor(props){
        super(props);
        
        this.constraints.set('HS102', this.vaa);
        this.constraints.set('HS104', this.vab);
        for(let i:number = 0;i < this.num_rows; ++i)
        {
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
        this.state = {
            schedule_state: this.temp,
            uns: []
        }
        console.log('hiiiiii')
        console.log(this.state.schedule_state);
        // this.getA = this.getA.bind(this);
        this.ObjectRow = this.ObjectRow.bind(this);
        
        for (var i = 0; i < this.num_rows; i++) {
            this.rows.push(<this.ObjectRow value={i}/>); 
          }
    }
    Get_Courses_In_Schedule(): string[]
    {
      let tempry:string[] = []
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.A[i]))
          tempry.push(this.state.schedule_state.A[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.B[i]))
          tempry.push(this.state.schedule_state.B[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.C[i]))
          tempry.push(this.state.schedule_state.C[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.D[i]))
          tempry.push(this.state.schedule_state.D[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.E[i]))
          tempry.push(this.state.schedule_state.E[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.F[i]))
          tempry.push(this.state.schedule_state.F[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.G[i]))
          tempry.push(this.state.schedule_state.G[i]);
      }
      for(let i = 0; i < this.num_rows; ++i)
      {
        if(this.courseList.includes(this.state.schedule_state.H[i]))
          tempry.push(this.state.schedule_state.H[i]);
      }
      tempry.sort();
      return tempry;
    }

    Give_confilicts(SlotValue: string[], SlotName: string): string[]
    {
      let tempr:string[] = []
      for(let j = 0; j < this.num_rows; ++j)
      {
        if(SlotValue[j].length < 5)
          continue;

        else if(this.courseList.includes(SlotValue[j]))
        {
          let cons = this.constraints.get(SlotValue[j])
          for(let i = 0; i < this.num_rows;++i)
          {
            // console.log(slot[i])
            if(cons.includes(SlotValue[i]))
            {
              let er = "There is a clash in " + SlotValue[j] + " and " + SlotValue[i] + " in Slot " + SlotName;
              // let tempo = this.state.uns;
              tempr.push(er);
              // this.setState({ uns: tempo});
              // console.log(this.state.uns);
            }
          }
        }

        else
        {
          let er = "The course " + SlotValue[j] + " does not exist";
          // let tempo = this.state.uns;
          // console.log(tempo)
          tempr.push(er);
          // this.setState({ uns: tempo});
        }
      }
      return tempr
    }
    Check_constraints(): void
  {
    let tempo:string[] = [];

    // if(val.length < 5)
    //   return;
    
    // if(!this.courseList.includes(val))
    // {
    //    let er = "The course " + val + " Does not exist";
    //    let tempo = this.state.uns;
    //    tempo.push(er);
    //    this.setState({ uns: tempo});
    //    console.log(this.state.uns);
    // }
    
    
      let temp1 = this.Give_confilicts(this.state.schedule_state.A, "A")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.B, "B")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.C, "C")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.D, "D")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }
      
      temp1 = this.Give_confilicts(this.state.schedule_state.E, "E")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.F, "F")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.G, "G")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }

      temp1 = this.Give_confilicts(this.state.schedule_state.H, "H")
      for(let i = 0; i < temp1.length; ++i)
      {
        tempo.push(temp1[i]);
      }
      
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

  // isExistInAllList( val:string): boolean
  // {
  //   if(!this.courseList.includes(val))
  //     return;


  //   if(this.state.schedule_state.A.includes(val))
  //   {

  //     let er = val + " Already exist in slot A";
  //     let tempo = this.state.uns;
  //      tempo.push(er);
  //      this.setState({ uns: tempo});
  //      console.log(this.state.uns);
  //   }
  //   else if(this.state.schedule_state.B.includes(val))
  //   {
  //     let er = val + " Already exist in slot B";
  //     let tempo = this.state.uns;
  //      tempo.push(er);
  //      this.setState({ uns: tempo});
  //      console.log(this.state.uns);
  //      return truei] == 
  //   }
  //   else if(this.state.schedule_state.C.includes(val))
  //   {
  //     let er = val + " Already exist in slot C";
  //     let tempo = this.state.uns;
  //      tempo.push(er);
  //      this.setState({ uns: tempo});
  //      console.log(this.state.uns);
  //     return true
  //   }
  //   else if(this.state.schedule_state.D.includes(val))
  //   {
  //     let er = val + " Already exist in slot D";
  //     let tempo = this.state.uns;
  //     tempo.push(er);
  //     this.setState({ uns: tempo});
  //     console.log(this.state.uns);
  //     return true
  //   }
  //   else if(this.state.schedule_state.E.includes(val))
  //   {
  //     let er = val + " Already exist in slot E";
  //     let tempo = this.state.uns;
  //     tempo.push(er);
  //     this.setState({ uns: tempo});
  //     console.log(this.state.uns);
  //     return true
  //   }
  //   else if(this.state.schedule_state.F.includes(val))
  //   {
  //     let er = val + " Already exist in slot F";
  //     let tempo = this.state.uns;
  //     tempo.push(er);
  //     this.setState({ uns: tempo});
  //     console.log(this.state.uns);
  //     return true
  //   }
  //   else if(this.state.schedule_state.G.includes(val))
  //   {
  //     let er = val + " Already exist in slot G";
  //     let tempo = this.state.uns;
  //     tempo.push(er);
  //     this.setState({ uns: tempo});
  //     console.log(this.state.uns);
  //     return true
  //   }
  //   else if(this.state.schedule_state.H.includes(val))
  //   {
  //     let er = val + " Already exist in slot H";
  //     let tempo = this.state.uns;
  //     tempo.push(er);
  //     this.setState({ uns: tempo});
  //     console.log(this.state.uns);
  //     return true
  //   }
  //   return false;
  // }
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
        // console.log(this.state.schedule_state.A[0])
      
        return(
        <div>
        
        <Row>
        <Col xs="8">
        <div>

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
              {this.rows}
            </tbody>
            
          </Table>
          </div>
          </Col>
          <Col xs="4">
          <div>
            <ListGroup>
            {this.state.uns.map((un) => <ListGroupItem className="justify-content-between" color="danger">{un}</ListGroupItem>)}
            </ListGroup>
          </div>
          </Col>
          </Row>
          
          </div>
        )
    }
}
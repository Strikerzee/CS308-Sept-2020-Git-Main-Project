import * as React from 'react';
import * as ReactDOM from 'react-dom'
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

interface inpp {
  value: number
}
export class Table_class extends React.Component <{}, {schedule_state: schedule, uns: string[]}> {
    num_rows:number = 30;
    // rows = []
    courseList:string[] = [ 'HS102' , 'HS104', 'HS302', 'HS122', 'HS239', 'CS304', 'HS510', 'CS902', 'CS204' ];
    constraints = new Map<string, string[]>();
    vaa = ['HS104', 'HS302'];
    temp:schedule;
    vm: string[] = [];
    state :{
      schedule_state: schedule,
      uns: string[]
    }

    constructor(props){
        super(props);
        console.log('hiiiiii')
        this.constraints.set('HS102', this.vaa);
        this.vaa = ['HS102', 'HS122'];
        this.constraints.set('HS104', this.vaa);
        for(let i:number = 0;i < this.num_rows; ++i)
        {
            this.vm.push('');
        }
        this.temp = {A: this.vm, B: this.vm, C: this.vm , D: this.vm , E: this.vm , F: this.vm , G: this.vm , H: this.vm};
        this.vm = []
        this.state = {
            schedule_state: this.temp,
            uns: this.vm
        }
        console.log(this.state);
        // this.getA = this.getA.bind(this);
        this.ObjectRow = this.ObjectRow.bind(this);
        
        // for (var i = 0; i < this.num_rows; i++) {
        //     this.rows.push(<this.ObjectRow inp={i}/>);
        //   }
    }

    Check_constraints(slot:string[], val:string): void
  {
    
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
    
    
      for(let j = 0; j < 30; ++j)
      {
        if(this.state.schedule_state.A[j].length < 5)
          continue;

        else if(this.courseList.includes(this.state.schedule_state.A[j]))
        {
          let cons = this.constraints.get(this.state.schedule_state.A[j])
          for(let i = 0; i < slot.length;++i)
          {
            // console.log(slot[i])
            if(cons.includes(slot[i]))
            {
              let er = "There is a clash in " + val + " and " + slot[i];
              let tempo = this.state.uns;
              tempo.push(er);
              this.setState({ uns: tempo});
              console.log(this.state.uns);
            }
          }
        }

        else
        {
          let er = "The course " + this.state.schedule_state.A[j] + " does not exist";
          let tempo = this.state.uns;
          console.log(tempo)
          tempo.push(er);
          this.setState({ uns: tempo});
        }
      }
    
      
  }

  isExistInAllList(val:string): boolean
  {


    if(this.state.schedule_state.A.includes(val))
    {

      let er = val + " Already exist in slot A";
      let tempo = this.state.uns;
       tempo.push(er);
       this.setState({ uns: tempo});
       console.log(this.state.uns);
    }
    else if(this.state.schedule_state.B.includes(val))
    {
      let er = val + " Already exist in slot B";
      let tempo = this.state.uns;
       tempo.push(er);
       this.setState({ uns: tempo});
       console.log(this.state.uns);
       return true
    }
    else if(this.state.schedule_state.C.includes(val))
    {
      let er = val + " Already exist in slot C";
      let tempo = this.state.uns;
       tempo.push(er);
       this.setState({ uns: tempo});
       console.log(this.state.uns);
      return true
    }
    else if(this.state.schedule_state.D.includes(val))
    {
      let er = val + " Already exist in slot D";
      let tempo = this.state.uns;
      tempo.push(er);
      this.setState({ uns: tempo});
      console.log(this.state.uns);
      return true
    }
    else if(this.state.schedule_state.E.includes(val))
    {
      let er = val + " Already exist in slot E";
      let tempo = this.state.uns;
      tempo.push(er);
      this.setState({ uns: tempo});
      console.log(this.state.uns);
      return true
    }
    else if(this.state.schedule_state.F.includes(val))
    {
      let er = val + " Already exist in slot F";
      let tempo = this.state.uns;
      tempo.push(er);
      this.setState({ uns: tempo});
      console.log(this.state.uns);
      return true
    }
    else if(this.state.schedule_state.G.includes(val))
    {
      let er = val + " Already exist in slot G";
      let tempo = this.state.uns;
      tempo.push(er);
      this.setState({ uns: tempo});
      console.log(this.state.uns);
      return true
    }
    else if(this.state.schedule_state.H.includes(val))
    {
      let er = val + " Already exist in slot H";
      let tempo = this.state.uns;
      tempo.push(er);
      this.setState({ uns: tempo});
      console.log(this.state.uns);
      return true
    }
    return false;
  }
    getA(event: form_elem, inp:number) {
        let tt:string[] = [];
        this.setState({uns: tt});
        console.log(tt)
        console.log(this.state.uns);
        const val:string = event.target.value;
        // setM(val);
        if(val.length > 0)
          this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.A[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.A, val);
        
    
      }
      getB(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.B[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.B, val);
        
    
      }
      getC(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.C[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.C, val);
        
    
      }
      getD(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.D[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.D, val);
        
    
      }
      getE(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.E[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.E, val);
        
    
      }
      getF(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.F[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.F, val);
        
    
      }
      getG(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.G[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.G, val);
        
    
      }
      getH(event: form_elem, inp:number) {
        const val:string = event.target.value;
        // setM(val);
        this.isExistInAllList(val);
        let temp:schedule = this.state.schedule_state;
        temp.H[inp] = val;
        this.setState({schedule_state: temp})
        this.Check_constraints(this.state.schedule_state.H, val);
        
    
      }
      

    
    
    ObjectRow(inp: inpp){
        return (
          <tr>
            
            <th scope="row"><Input onChange={(e) => this.getA(e, inp.value)} value={this.state.schedule_state.A[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getB(e, inp.value)} value={this.state.schedule_state.B[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getC(e, inp.value)} value={this.state.schedule_state.C[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getD(e, inp.value)} value={this.state.schedule_state.D[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getE(e, inp.value)} value={this.state.schedule_state.E[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getF(e, inp.value)} value={this.state.schedule_state.F[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getG(e, inp.value)} value={this.state.schedule_state.G[inp.value]}/></th>
            <th scope="row"><Input onChange={(e) => this.getH(e, inp.value)} value={this.state.schedule_state.H[inp.value]}/></th>
           
          </tr>
        )
      }

    render() {
        console.log(this.state.schedule_state.A[0])
        let rows = [];
        for (var i = 0; i < this.num_rows; i++) {
            rows.push(<this.ObjectRow value={i}/>); 
          }
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
              {rows}
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
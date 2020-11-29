import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Table_Form} from './Table'
import {Table_class} from './Table_class'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <div>
      <Table_class />  
    </div>,
    document.querySelector('#root')
)

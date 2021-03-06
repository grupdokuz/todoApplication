import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider} from 'semantic-ui-react'




class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getTodos = this.getTodos.bind(this)
    this.getTodo = this.getTodo.bind(this)
  }
  componentDidMount () {
       
    this.getTodos()
        document.title = "Todo App";
  }
  fetch (endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }
  getTodos () {
    this.fetch('api/todos')
      .then(todos => {
        this.setState({todos: todos})
        this.getTodo(todos[0].id)
      })
  }
  getTodo (id) {
    this.fetch(`api/todos/${id}`)
      .then(todo => this.setState({todo: todo}))
  }
  refresh(){
        this.getTodos();
	this.render();
  }
  newTodos(){
     var value = document.getElementById("newTitle").value
	if(value==""){
		window.alert("title must be");
		return;}
     var date = document.getElementById("due_date_label").value
      window.fetch('api/todos', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({ "todo": { "title": value, "created_by": "enes" ,"due_date":date} })
	    }).then(response => console.log(response));
	this.refresh();
  }
  newItem(id){
      var value = document.getElementById("newTitle").value
	if(value==""){
		window.alert("title must be");
		return;}
        window.fetch(`api/hello_world`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'hello_world'
        }).then(response => console.log(response));


      window.fetch(`api/todos/${id}/items`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({ "item": { "todo_id": id, "name":    	value ,"done":false} })
	    }).then(response => console.log(response));
	this.refresh();
  }

  deleteTodo(id,todo){
	    window.fetch(`api/todos/${id}` ,{
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'DELETE',
	body: todo
    }).then(response => console.log(response));
	this.refresh();
  }
  render () {
    let {todos, todo} = this.state
    return todos
    ? <Container text>
        <Header as='h2' icon textAlign='center'>
        <Icon name='numbered list' circular />
        <Header.Content>
          Todo List
        </Header.Content>
      </Header>
      <Button.Group fluid widths={todos.length}>
        {Object.keys(todos).map((key) => {
          return <Button active={todo && todo.id === todos[key].id} fluid key={key} onClick={() => this.getTodo(todos[key].id)}>
            {todos[key].title}
          </Button>
        })}
      </Button.Group>
      <Divider hidden />
      {todo &&
        <Container>
          <Header as='h2'>due date: {todo.due_date.replace("T","  ").replace(":00.000Z","")}</Header>
          {todo.created_by && <p>{todo.created_by}</p>}
          {todo.items &&
            <Segment.Group>
              {todo.items.map((item, i) => <Segment key={i}>{item.name}</Segment>)}
            </Segment.Group>
          }
        </Container>
      }
	<Button  onClick={() => this.deleteTodo(todo.id,todo)}>
            {'Delete'}
	</Button>
	<Button  onClick={() => this.newItem(todo.id)}>
            {'Add item'}
	</Button>
	<Button  onClick={() => this.newTodos()}>
            {'New'}
	</Button>
    </Container>
    : <Container text>
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    </Container>
  }

}

export default App

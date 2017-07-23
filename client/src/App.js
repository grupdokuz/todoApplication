import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getTodos = this.getTodos.bind(this)
    this.getTodo = this.getTodo.bind(this)
  }
  componentDidMount () {
    this.getTodos()
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
      window.fetch('api/todos', {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({ "todo": { "title": "asd", "created_by": "enes" } })
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
          <Header as='h2'>{todo.title}</Header>
          {todo.created_by && <p>{todo.created_by}</p>}
          {todo.items &&
            <Segment.Group>
              {todo.items.map((item, i) => <Segment key={i}>{item.name}</Segment>)}
            </Segment.Group>
          }
        </Container>
      }
	<Button  onClick={() => this.deleteTodo(todo.id,todo)}>
            {'delete'}
	</Button>
	<Button  onClick={() => this.newTodos()}>
            {'New'}
	</Button>
	<div class="App" >
  		<input type="text" placeholder="title..." id="newTitle">
		</input>
	</div>


    </Container>
    : <Container text>
      <Dimmer active inverted>
        <Loader content='Loading' />
      </Dimmer>
    </Container>
  }

}

export default App

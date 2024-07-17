class TodosController < ApplicationController
  before_action :set_current_user
  before_action :set_todo, only: %i[show update destroy]

  # GET /users/:user_id/todos
  def index
    @todos = @user.todos.order(created_at: :desc)
    render json: @todos
  end

  # GET /users/:user_id/todos/:id
  def show
    render json: @todo
  end

  # POST /users/:user_id/todos
  def create
    @todo = @user.todos.build(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:user_id/todos/:id
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/todos/:id
  def destroy
    @todo.destroy!
    head :no_content
  end

  private

  def set_current_user
    @user = User.find(params[:user_id])
  end

  def set_todo
    @todo = @user.todos.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :theme, task: [], completed: [])
  end
end

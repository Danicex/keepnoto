class EventsController < ApplicationController
  before_action :set_event, only: %i[ show update destroy ]
  before_action :set_current_user
  
  def set_current_user
    @user = User.find(params[:user_id]) 
  end
  # GET /events
  def index
    @events = @user.events.order(created_at: :desc)

    render json: @events
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    @event = @user.events.build(event_params)

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    @event.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:title, :date, :description, :theme, :user_id)
    end
end

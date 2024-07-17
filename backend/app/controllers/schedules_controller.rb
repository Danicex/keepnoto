class SchedulesController < ApplicationController
  before_action :set_user
  before_action :set_event, only: %i[index create]
  before_action :set_schedule, only: %i[show update destroy]

  # GET /users/:user_id/events/:event_id/schedules
  def index
    @schedules = @event.schedules.order(created_at: :desc)
    render json: @schedules
  end

  # GET /schedules/:id
  def show
    render json: @schedule
  end

  # POST /users/:user_id/events/:event_id/schedules
  def create
    @schedules = @event.schedules.build(schedules_params)
    if @schedules.all?(&:save)
      render json: @schedules, status: :created
    else
      render json: @schedules.map(&:errors), status: :unprocessable_entity
    end
  end

  # PATCH/PUT /schedules/:id
  def update
    if @schedule.update(schedule_params)
      render json: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  # DELETE /schedules/:id
  def destroy
    @schedule.destroy!
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_event
    @event = @user.events.find(params[:event_id])
  end

  def set_schedule
    @schedule = Schedule.find(params[:id])
  end

  def schedule_params
    params.require(:schedule).permit(:name, :time)
  end

  def schedules_params
    params.require(:schedules).map do |schedule|
      schedule.permit(:name, :time)
    end
  end
end

class NotesController < ApplicationController
  before_action :set_note, only: %i[ show update destroy ]
  before_action :set_current_user
  
  def set_current_user
    @user = User.find(params[:user_id]) 
  end
  # GET /notes
  def index
    @notes = @user.notes.order(created_at: :desc)

    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  def search 
    query = params[:q]
    if  query.present?
      @notes = Note.where('title LIKE ? OR content LIKE ?', "%#{query}%", "%#{query}%")
    else
      @note = Note.all
    end
    render json:{results: @notes}
  end
  
  # POST /notes
  def create
    @note = @user.notes.build(note_params)

    if @note.save
      render json: @note, status: :created
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def note_params
      params.require(:note).permit(:title, :body, :theme, :user_id)
    end
end

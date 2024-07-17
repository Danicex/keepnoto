class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[ show update destroy ]
  before_action :set_current_user

  # GET /profiles
  def index
    @profiles = @user.profiles.order(created_at: :desc)

    render json: @profiles
  end

  # GET /profiles/1
  def show
    render json: @profile
  end

  # POST /profiles
  def create
    @profile = @user.build_profile(profile_params)
  
    if @profile.save
      if params[:profile][:image].present?
        @profile.image.attach(params[:profile][:image])
        @profile.update(image_url: url_for(@profile.image))
      end
      render json: @profile, status: :created, location: @profile
    else
      render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # PATCH/PUT /profiles/1
  def update
    if @profile.update(profile_params)
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /profiles/1
  def destroy
    @profile.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    def set_current_user
      @user = User.find(params[:user_id])
    end


    # Only allow a list of trusted parameters through.
    def profile_params
      params.require(:profile).permit(:image_url, :user_id, :image)
    end
end

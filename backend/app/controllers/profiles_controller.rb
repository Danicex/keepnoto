class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[show update destroy]
  before_action :set_current_seller, only: %i[index create]

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
      attach_image if params[:profile][:image].present?
      render json: @profile, status: :created
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /profiles/1
  def update
    if params[:profile][:image].present?
      @profile.image.attach(params[:profile][:image])
    end

    if @profile.update(profile_params)
      @profile.update(image_url: url_for(@profile.image)) if @profile.image.attached?
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /profiles/1
  def destroy
    @profile.destroy!
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_profile
    @profile = Profile.find_by!(user_id: params[:user_id])
  end

  def set_current_seller
    @user = User.find(params[:user_id])
  end

  # Only allow a list of trusted parameters through.
  def profile_params
    params.require(:profile).permit(:image_url)
  end

  def attach_image
    @profile.image.attach(params[:profile][:image])
    @profile.update(image_url: url_for(@profile.image)) if @profile.image.attached?
  end
end

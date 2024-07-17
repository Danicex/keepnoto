class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api 

         validates :email, presence: true, uniqueness: true
         validates :password, presence: true, length: { minimum: 6 }
         
         has_many :notes
         has_many :events
         has_many :todos
         has_one :profile, dependent: :destroy
      end

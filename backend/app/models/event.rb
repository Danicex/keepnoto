class Event < ApplicationRecord
  belongs_to :user
  has_many :schedules

  validates :title, presence: true
end

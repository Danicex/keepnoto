class Todo < ApplicationRecord
  belongs_to :user
  
  validates :title, presence: true
  validates :theme, presence: true
  validates :task, presence: true
  validates :completed, presence: true

  serialize :task, coder: JSON
  serialize :completed, coder: JSON
end

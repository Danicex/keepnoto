class Schedule < ApplicationRecord
  belongs_to :event

  serialize :name, coder: JSON
  serialize :date, coder: JSON
end

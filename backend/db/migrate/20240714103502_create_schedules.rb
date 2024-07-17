class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.text :name
      t.text :time
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end

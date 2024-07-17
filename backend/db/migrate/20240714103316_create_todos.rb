class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :task
      t.text :completed
      t.string :theme
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

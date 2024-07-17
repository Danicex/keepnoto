class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :date
      t.string :description
      t.string :theme
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

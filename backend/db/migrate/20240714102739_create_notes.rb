class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body
      t.string :theme
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

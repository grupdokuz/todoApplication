class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.references :todo, foreign_key: true
      t.string :name
      t.boolean :done

      t.timestamps
    end
  end
end

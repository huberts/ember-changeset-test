import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import {validatePresence} from 'ember-changeset-validations/validators';

export default Controller.extend({
  store: service(),
  
  validator: {
    name: validatePresence(true)
  },

  init() {
    this._super(...arguments);

    this.set("parent", this.get("store").createRecord("parent", {name: "This is parent w/o changeset name"}));

    let parentForChangeset = this.get("store").createRecord("parent", {name: "This is parent w changeset name"});

    this.set("changeset", new Changeset(parentForChangeset, lookupValidator(this.get("validator")), this.get("validator")));

  },

  actions: {
    addChild1() {
      console.log("add child for parent w/o changeset");
      this.get("parent.children").addObject(this.get("store").createRecord("child"));
      
    },
    addChild2() {
      console.log("add child for parent w changeset");
      this.get("changeset.children").addObject(this.get("store").createRecord("child"));
      
    }
  }
});

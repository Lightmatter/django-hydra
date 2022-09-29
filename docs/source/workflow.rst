Workflow to write back to template
===================================

Create an instance of the template using the test.sh script. Create changes in the sample app, commit to git and run the script create_patch. This will attempt to take the git diff of the prior commit and apply it back to the template. It's not always perfect so you might have to do a comparison to the rej files that were unable to cleanly apply.